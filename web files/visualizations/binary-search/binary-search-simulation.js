/* ============================================================
   Binary Search — Simulation Plugin
   Loaded dynamically by router.js when algo=binary-search
   Exports window.AlgoSim with the standard 4-property contract.
   ============================================================ */

window.AlgoSim = {

  // ── 1. Pseudocode lines (indices must match step.code arrays) ──
  pseudocode: [
    'left = 0',
    'right = n - 1',
    'while left ≤ right:',
    '    mid = ⌊(left + right) / 2⌋',
    '    if arr[mid] == target → FOUND',
    '    elif arr[mid] < target: left = mid + 1',
    '    else: right = mid - 1',
    'return NOT FOUND',
  ],

  // ── 2. init — called by router once the plugin is loaded ──
  // Receives the parsed inputs object and the shared visualizationState.
  // Generates steps, stores them on state, renders step 0.
  init(inputs, state, vizArea) {
    let arr = [...inputs.array].sort((a, b) => a - b);
    inputs.array = arr; // keep state in sync with sorted version

    state.algoSteps  = this.generateSteps(arr, inputs.target);
    state.totalSteps = state.algoSteps.length - 1;
    state.currentStep = 0;

    this.renderStep(0, state, vizArea);
  },

  // ── 3. generateSteps — pure function, returns step array ──
  generateSteps(arr, target) {
    const steps = [];
    let left = 0, right = arr.length - 1;

    steps.push({
      type: 'init', left, right, mid: null,
      desc: `Initialize: <span class='hl-blue'>left=${left}</span>, <span class='hl-orange'>right=${right}</span>, target=<span class='hl-green'>${target}</span>`,
      code: [0, 1]
    });

    while (left <= right) {
      steps.push({
        type: 'check', left, right, mid: null,
        desc: `Loop check: <span class='hl-blue'>left(${left})</span> ≤ <span class='hl-orange'>right(${right})</span> → continue`,
        code: [2]
      });

      const mid = Math.floor((left + right) / 2);
      steps.push({
        type: 'calc_mid', left, right, mid,
        desc: `mid = ⌊(${left} + ${right}) / 2⌋ = <span class='hl-green'>${mid}</span>  →  arr[${mid}] = <span class='hl-green'>${arr[mid]}</span>`,
        code: [3]
      });

      if (arr[mid] === target) {
        steps.push({
          type: 'found', left, right, mid,
          desc: `🎉 arr[<span class='hl-green'>${mid}</span>] = <span class='hl-green'>${arr[mid]}</span> == target <span class='hl-green'>${target}</span> → <strong>FOUND at index ${mid}!</strong>`,
          code: [4]
        });
        break;
      } else if (arr[mid] < target) {
        steps.push({
          type: 'go_right', left, right, mid,
          desc: `arr[${mid}]=${arr[mid]} &lt; target=${target} → search right half → <span class='hl-blue'>left = ${mid + 1}</span>`,
          code: [5]
        });
        left = mid + 1;
      } else {
        steps.push({
          type: 'go_left', left, right, mid,
          desc: `arr[${mid}]=${arr[mid]} &gt; target=${target} → search left half → <span class='hl-orange'>right = ${mid - 1}</span>`,
          code: [6]
        });
        right = mid - 1;
      }
    }

    if (!steps.find(s => s.type === 'found')) {
      steps.push({
        type: 'not_found', left, right, mid: null,
        desc: `<span class='hl-red'>left(${left}) &gt; right(${right})</span> — target <strong>${target}</strong> not found in array.`,
        code: [7]
      });
    }

    return steps;
  },

  // ── 4. renderStep — renders step[stepIndex] into vizArea DOM ──
  renderStep(stepIndex, state, vizArea) {
    const step = state.algoSteps[stepIndex];
    const arr  = state.data.array;

    vizArea.innerHTML = '';

    // Pointer row (L / M / R labels)
    const ptrRow = document.createElement('div');
    ptrRow.className = 'bs-pointer-row';
    arr.forEach((_, i) => {
      const p = document.createElement('div');
      p.className = 'bs-ptr';
      const tags = [];
      if (step.mid !== null && i === step.left)  tags.push('L');
      if (step.mid !== null && i === step.right) tags.push('R');
      if (step.mid !== null && i === step.mid)   tags.push('M');
      if (tags.length) {
        p.textContent = tags.join('/');
        const cls = tags[0] === 'L' ? 'show-L' : tags[0] === 'R' ? 'show-R' : 'show-M';
        p.classList.add(cls);
      }
      ptrRow.appendChild(p);
    });

    // Array cells
    const container = document.createElement('div');
    container.className = 'array-container';
    arr.forEach((val, i) => {
      const el = document.createElement('div');
      el.className = 'array-element';
      el.textContent = val;

      if      (step.type === 'found' && i === step.mid)                             el.classList.add('bs-found');
      else if (step.type === 'not_found')                                            el.classList.add('bs-not-found');
      else if (step.mid !== null && i === step.mid)                                  el.classList.add('bs-mid');
      else if (step.mid !== null && (i < step.left || i > step.right))              el.classList.add('bs-eliminated');
      else if (step.mid !== null && i >= step.left && i <= step.right)              el.classList.add('bs-in-range');
      else if (step.mid === null && i >= step.left && i <= step.right)              el.classList.add('bs-in-range');

      container.appendChild(el);
    });

    // Index row
    const idxRow = document.createElement('div');
    idxRow.className = 'bs-index-row';
    arr.forEach((_, i) => {
      const ic = document.createElement('div');
      ic.className = 'bs-idx';
      ic.textContent = i;
      idxRow.appendChild(ic);
    });

    // Variables strip (left / right / mid / target)
    const vars = document.createElement('div');
    vars.className = 'bs-vars';
    [
      { cls: 'var-l', name: 'left',   val: (step.mid !== null || step.type === 'init') ? step.left  : '—' },
      { cls: 'var-r', name: 'right',  val: (step.mid !== null || step.type === 'init') ? step.right : '—' },
      { cls: 'var-m', name: 'mid',    val: step.mid !== null ? step.mid : '—' },
      { cls: 'var-t', name: 'target', val: state.data.target },
    ].forEach(({ cls, name, val }) => {
      const box = document.createElement('div');
      box.className = `bs-var ${cls}`;
      box.innerHTML = `<div class="bs-var-name">${name}</div><div class="bs-var-val">${val}</div>`;
      vars.appendChild(box);
    });

    // Step message
    const msg = document.createElement('div');
    msg.className = 'bs-msg';
    msg.innerHTML = step.desc;

    vizArea.appendChild(ptrRow);
    vizArea.appendChild(container);
    vizArea.appendChild(idxRow);
    vizArea.appendChild(vars);
    vizArea.appendChild(msg);

    // Sync pseudocode highlight
    document.querySelectorAll('.pseudocode-line').forEach(l => l.classList.remove('active'));
    (step.code || []).forEach(i => {
      const el = document.getElementById(`code-line-${i}`);
      if (el) el.classList.add('active');
    });
  }

};
