/* ============================================================
   router.js
   Reads ?algo= from the URL, loads the matching plugin files
   from /visualizations/<algo>/, then wires window.AlgoSim
   into the visualizer shell's shared control logic.

   To add a new algorithm:
     1. Create /visualizations/<algo-key>/styles.css
     2. Create /visualizations/<algo-key>/simulation.js
        (must export window.AlgoSim with the 4-property contract)
     3. No changes needed here or in visualizer.html.
   ============================================================ */

(function () {
  'use strict';

  // ── 1. Resolve the algorithm key from URL ──────────────────
  const params  = new URLSearchParams(window.location.search);
  const algoKey = params.get('algo');

  if (!algoKey || !DSAData[algoKey]) {
    window.location.href = 'homepage.html';
    return;
  }

  const algoData = DSAData[algoKey];

  // ── 2. Populate static page info (title, info panel, inputs) ──
  document.getElementById('algoTitle').textContent = algoData.name;
  document.title = `${algoData.name} — DSA Visualizer`;

  // Category badge
  document.getElementById('category').innerHTML =
    `<span class="category-badge">${algoData.category}</span>`;

  // Complexity badges
  formatComplexity(document.getElementById('timeComplexity'),  algoData.timeComplexity);
  formatComplexity(document.getElementById('spaceComplexity'), algoData.spaceComplexity);

  // Description / historical
  document.getElementById('description').textContent = algoData.description;
  document.getElementById('developer').innerHTML =
    `<span class="developer-name">${algoData.developer}</span>`;
  document.getElementById('year').innerHTML =
    `<span class="year-value">${algoData.yearDeveloped}</span>`;
  document.getElementById('useCases').innerHTML =
    `<span class="use-cases-text">${algoData.useCases}</span>`;

  // Build input fields from data
  const inputFieldsContainer = document.getElementById('inputFields');
  algoData.inputFields.forEach((field) => {
    const group = document.createElement('div');
    group.className = 'input-group';
    const label = document.createElement('label');
    label.textContent = field.label;

    let input;
    if (field.type === 'select') {
      input = document.createElement('select');
      input.id = field.name;
      field.options.forEach((opt) => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        input.appendChild(option);
      });
    } else {
      input = document.createElement('input');
      input.type  = field.type === 'array' ? 'text' : field.type;
      input.id    = field.name;
      input.placeholder = field.placeholder;
    }

    group.appendChild(label);
    group.appendChild(input);
    inputFieldsContainer.appendChild(group);
  });

  // ── 3. Dynamically inject algo CSS ────────────────────────
  const pluginBase = `visualizations/${algoKey}`;

  const link = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = `${pluginBase}/styles.css`;
  document.head.appendChild(link);

  // ── 4. Dynamically load algo JS plugin ────────────────────
  const script = document.createElement('script');
  script.src = `${pluginBase}/simulation.js`;
  script.onload  = onPluginLoaded;
  script.onerror = () => {
    console.warn(`[router] No simulation plugin found for "${algoKey}". Using generic fallback.`);
    window.AlgoSim = null;
    onPluginLoaded(); // still wire up the shell so the page isn't broken
  };
  document.head.appendChild(script);

  // ── 5. Wire controls once plugin is ready ─────────────────
  function onPluginLoaded() {
    // Populate pseudocode panel from plugin (if available) or fall back to data
    const pseudocodeContainer = document.getElementById('pseudocode');
    const lines = (window.AlgoSim && window.AlgoSim.pseudocode)
      ? window.AlgoSim.pseudocode
      : algoData.pseudocode;

    lines.forEach((line, index) => {
      const div = document.createElement('div');
      div.className = 'pseudocode-line';
      div.id = `code-line-${index}`;
      div.textContent = line;
      pseudocodeContainer.appendChild(div);
    });

    // Shared state object passed to every plugin call
    const visualizationState = {
      isRunning:   false,
      isPaused:    false,
      currentStep: 0,
      totalSteps:  0,
      intervalId:  null,
      data:        null,
      algoSteps:   null,
    };

    // DOM references
    const startBtn        = document.getElementById('startBtn');
    const startRestartBtn = document.getElementById('startRestartBtn');
    const prevBtn         = document.getElementById('prevBtn');
    const stepBtn         = document.getElementById('stepBtn');
    const autoBtn         = document.getElementById('autoBtn');
    const resetBtn        = document.getElementById('resetBtn');
    const speedSlider     = document.getElementById('speedSlider');
    const speedLabel      = document.getElementById('speedLabel');
    const controls        = document.getElementById('controls');
    const stepIndicator   = document.getElementById('stepIndicator');
    const vizArea         = document.getElementById('vizArea');

    // ── Event listeners ──
    startBtn.addEventListener('click', initializeVisualization);
    startRestartBtn.addEventListener('click', initializeVisualization);
    prevBtn.addEventListener('click', stepBackward);
    stepBtn.addEventListener('click', stepForward);
    autoBtn.addEventListener('click', toggleAutoPlay);
    resetBtn.addEventListener('click', resetVisualization);

    speedSlider.addEventListener('input', () => {
      const val = parseInt(speedSlider.value);
      const labels = { 200:'4x', 300:'3x', 400:'2.5x', 500:'2x', 600:'1.5x',
                       700:'1.2x', 900:'1x', 1100:'0.8x', 1300:'0.6x',
                       1500:'0.5x', 1700:'0.4x', 2000:'0.3x' };
      speedLabel.textContent = labels[val] || '1x';
      if (visualizationState.intervalId) {
        clearInterval(visualizationState.intervalId);
        visualizationState.intervalId = _startInterval(val);
      }
    });

    // ── Core control functions ──

    function initializeVisualization() {
      pauseVisualization();

      // Collect inputs
      const inputs = {};
      algoData.inputFields.forEach((field) => {
        const el = document.getElementById(field.name);
        if (field.type === 'array') {
          inputs[field.name] = el.value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
        } else if (field.type === 'number') {
          inputs[field.name] = parseInt(el.value);
        } else {
          inputs[field.name] = el.value;
        }
      });

      if (Object.values(inputs).some(v => !v && v !== 0 || (Array.isArray(v) && v.length === 0))) {
        alert('Please fill in all input fields correctly');
        return;
      }

      visualizationState.data        = inputs;
      visualizationState.isRunning   = true;
      visualizationState.currentStep = 0;
      visualizationState.algoSteps   = null;

      // Show controls
      controls.style.display      = 'flex';
      stepIndicator.style.display = 'block';
      prevBtn.disabled            = true;
      stepBtn.disabled            = false;
      autoBtn.disabled            = false;
      startRestartBtn.textContent = '↺ Restart';

      // Delegate rendering to plugin if available
      if (window.AlgoSim) {
        window.AlgoSim.init(inputs, visualizationState, vizArea);
      } else {
        genericFallbackRender(vizArea, algoData, visualizationState);
      }

      updateStepIndicator();
    }

    function stepForward() {
      if (visualizationState.currentStep >= visualizationState.totalSteps) return;
      visualizationState.currentStep++;
      renderCurrentStep();
      updateStepIndicator();
      prevBtn.disabled = visualizationState.currentStep === 0;
      stepBtn.disabled = visualizationState.currentStep >= visualizationState.totalSteps;
    }

    function stepBackward() {
      if (visualizationState.currentStep <= 0) return;
      visualizationState.currentStep--;
      renderCurrentStep();
      updateStepIndicator();
      prevBtn.disabled = visualizationState.currentStep === 0;
      stepBtn.disabled = false;
    }

    function renderCurrentStep() {
      if (window.AlgoSim) {
        window.AlgoSim.renderStep(visualizationState.currentStep, visualizationState, vizArea);
      }
    }

    function toggleAutoPlay() {
      if (visualizationState.intervalId) {
        // Pause
        clearInterval(visualizationState.intervalId);
        visualizationState.intervalId = null;
        visualizationState.isPaused   = true;
        autoBtn.textContent = '⏯ Auto';
        autoBtn.classList.remove('btn-primary');
        prevBtn.disabled = visualizationState.currentStep === 0;
        stepBtn.disabled = visualizationState.currentStep >= visualizationState.totalSteps;
      } else {
        // Play
        if (visualizationState.currentStep >= visualizationState.totalSteps) return;
        visualizationState.isPaused = false;
        autoBtn.textContent = '⏸ Pause';
        autoBtn.classList.add('btn-primary');
        prevBtn.disabled = true;
        stepBtn.disabled = true;
        visualizationState.intervalId = _startInterval(parseInt(speedSlider.value));
      }
    }

    function _startInterval(delay) {
      return setInterval(() => {
        if (visualizationState.currentStep < visualizationState.totalSteps) {
          stepForward();
        } else {
          clearInterval(visualizationState.intervalId);
          visualizationState.intervalId = null;
          autoBtn.textContent = '⏯ Auto';
          autoBtn.classList.remove('btn-primary');
          prevBtn.disabled = false;
          stepBtn.disabled = true;
        }
      }, delay);
    }

    function pauseVisualization() {
      if (visualizationState.intervalId) {
        clearInterval(visualizationState.intervalId);
        visualizationState.intervalId = null;
      }
      visualizationState.isPaused = true;
      autoBtn.textContent = '⏯ Auto';
      autoBtn.classList.remove('btn-primary');
    }

    function resetVisualization() {
      pauseVisualization();
      visualizationState.currentStep = 0;
      visualizationState.isRunning   = false;
      visualizationState.algoSteps   = null;

      controls.style.display      = 'none';
      stepIndicator.style.display = 'none';
      autoBtn.disabled            = true;
      prevBtn.disabled            = true;
      stepBtn.disabled            = true;

      vizArea.innerHTML = '<div class="viz-placeholder"><h3>Ready to visualize</h3><p>Configure inputs above and click "Start Visualization"</p></div>';
      document.querySelectorAll('.pseudocode-line').forEach(l => l.classList.remove('active'));
    }

    function updateStepIndicator() {
      stepIndicator.textContent = `Step ${visualizationState.currentStep} of ${visualizationState.totalSteps}`;
    }

    // ── Generic fallback (no plugin) ──
    function genericFallbackRender(vizArea, algoData, state) {
      vizArea.innerHTML = '';
      if (algoData.visualizationType === 'array' && state.data.array) {
        const container = document.createElement('div');
        container.className = 'array-container';
        state.data.array.forEach((value, index) => {
          const el = document.createElement('div');
          el.className = 'array-element';
          el.textContent = value;
          el.id = `element-${index}`;
          container.appendChild(el);
        });
        vizArea.appendChild(container);
        state.totalSteps = state.data.array.length * 2;
      } else {
        vizArea.innerHTML = '<div class="viz-placeholder"><h3>Visualization coming soon</h3><p>No plugin found for this algorithm.</p></div>';
        state.totalSteps = 0;
      }
    }
  }

  // ── Helpers ───────────────────────────────────────────────

  function formatComplexity(element, complexityText) {
    const parts = complexityText.split(/,|avg|worst|best/).map(s => s.trim()).filter(s => s);
    element.innerHTML = '';
    parts.forEach((part, index) => {
      const badge = document.createElement('span');
      badge.className = 'complexity-badge';
      badge.textContent = part;
      element.appendChild(badge);
      if ((index + 1) % 2 === 0 && index < parts.length - 1) {
        element.appendChild(document.createElement('br'));
      }
    });
    if (element.children.length === 0) {
      const badge = document.createElement('span');
      badge.className = 'complexity-badge';
      badge.textContent = complexityText;
      element.appendChild(badge);
    }
  }

})();
