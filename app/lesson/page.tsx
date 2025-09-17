<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>AI Ready · Track 5 · Reflection & Journaling</title>
  <style>
    :root{
      --bg:#f6f8fb;          /* app background */
      --card:#f1eff6;        /* soft panel from screenshots */
      --panel:#ffffff;       /* white panel */
      --ink:#101828;         /* primary text */
      --ink-2:#475467;       /* secondary text */
      --brand:#3b82f6;       /* primary button */
      --brand-2:#dbe7ff;     /* brand subtle */
      --accent:#e9d5ff;      /* purple banner */
      --ok:#22c55e;          /* success */
      --warn:#f59e0b;        /* warning */
      --chip:#f3f4f6;        /* chip bg */
      --chip-b:#e5e7eb;      /* chip border */
      --radius:18px;
      --radius-lg:22px;
      --shadow:0 10px 30px rgba(16,24,40,.06);
    }
    html,body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial, "Noto Sans", sans-serif}
    .container{max-width:1100px;margin:auto;padding:20px 16px 80px}
    header{position:sticky;top:0;background:#fff;z-index:5;border-bottom:1px solid #eef1f5}
    header .bar{display:flex;align-items:center;gap:14px;max-width:1100px;margin:auto;padding:12px 16px}
    .back{width:36px;height:36px;border-radius:999px;background:#f4f6fb;display:grid;place-items:center;cursor:pointer}
    h1{font-size:22px;margin:0}

    /* Cards & list */
    .card{background:#fff;border-radius:var(--radius-lg);box-shadow:var(--shadow);padding:16px}
    .list{display:grid;gap:16px}
    .list .tile{background:#f3f1f8;border-radius:var(--radius);padding:18px 18px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;border:1px solid #ece8f5}
    .tile-title{font-weight:700;font-size:22px}
    .tile-sub{color:var(--ink-2)}
    .tile .icon{font-size:22px;margin-right:12px}

    /* Sections inside a scenario */
    .section{background:#f7f6fb;border:1px solid #edeaf6;border-radius:var(--radius);padding:16px;margin:10px 0}
    .section h3{margin:0 0 8px 0;font-size:20px}
    .muted{color:var(--ink-2)}

    .chips{display:flex;flex-wrap:wrap;gap:10px}
    .chip{background:var(--chip);border:1px solid var(--chip-b);border-radius:999px;padding:10px 14px;font-weight:600;cursor:pointer}
    .chip:hover{background:#eef2f7}

    .banner{background:var(--accent);border-radius:var(--radius);padding:14px 16px;font-weight:700}

    .cta-primary{display:block;width:100%;text-align:center;background:var(--brand);color:#fff;border:none;border-radius:999px;padding:14px 18px;font-weight:800;cursor:pointer}
    .cta-outline{display:block;width:100%;text-align:center;background:transparent;color:var(--brand);border:2px solid var(--brand);border-radius:999px;padding:12px 18px;font-weight:800;cursor:pointer}
    .cta-ghost{display:block;width:100%;text-align:center;background:transparent;color:var(--ink);border:2px solid #d7dbe3;border-radius:999px;padding:12px 18px;font-weight:800;cursor:pointer}
    .cta-row{display:grid;gap:12px}

    .ok{display:flex;align-items:center;gap:10px;background:#ecfdf3;border:1px solid #bbf7d0;color:#065f46;border-radius:var(--radius);padding:14px 16px}
    .ok b{font-size:18px}

    .sp-24{height:24px}
    .sp-12{height:12px}

    .hidden{display:none}

    /* Responsive */
    @media (min-width: 740px){
      .two{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    }
  </style>
</head>
<body>
  <header>
    <div class="bar">
      <div class="back" role="button" aria-label="Back" onclick="goHome()">&#8592;</div>
      <h1>Choose a Scenario</h1>
    </div>
  </header>

  <main class="container">

    <!-- SCENARIO PICKER (like screenshot 1) -->
    <section id="picker" class="card">
      <h2 style="margin:8px 0 16px">Select a scenario to practice:</h2>
      <div class="list">
        <div class="tile" onclick="openScenario(1)">
          <div>
            <div class="tile-title">Daily Reflection Prompts</div>
            <div class="tile-sub">You want a 3‑minute daily reflection habit</div>
          </div>
          <div>›</div>
        </div>
        <div class="tile" onclick="openScenario(2)">
          <div>
            <div class="tile-title">Weekly Review Template</div>
            <div class="tile-sub">Turn last week’s notes into a Monday plan</div>
          </div>
          <div>›</div>
        </div>
        <div class="tile" onclick="openScenario(3)">
          <div>
            <div class="tile-title">Goal Progress Tracking</div>
            <div class="tile-sub">Capture stress, reframe, and pick one step</div>
          </div>
          <div>›</div>
        </div>
      </div>
    </section>

    <!-- SCENARIOS (detail pages) -->
    <section id="s1" class="hidden">
      <h2>Daily Reflection Prompts</h2>
      <div class="section">
        <h3>Situation</h3>
        <p class="muted">You want a 3‑minute daily reflection to capture wins, lessons, and blockers for &lt;project&gt;.</p>
      </div>
      <div class="section">
        <h3>What to Ask AI</h3>
        <p class="muted">“Act as a productivity coach. Create a 3‑minute end‑of‑day reflection template for a &lt;role&gt; working on &lt;project&gt;. Ask 5 concise questions covering wins, lessons, blockers, and priorities for tomorrow. Output as bullets.”</p>
      </div>
      <div class="section">
        <h3>AI's Response</h3>
        <ol>
          <li>What was my biggest win today and why?</li>
          <li>What challenge did I face and how did I handle it?</li>
          <li>What did I learn today that I can apply tomorrow?</li>
          <li>What would I do differently if I could repeat today?</li>
          <li>What am I grateful for today?</li>
        </ol>
      </div>
      <div class="section">
        <h3>Adjust the Result</h3>
        <div class="chips">
          <button class="chip" onclick="note('Shorter (3 questions)')">Shorter (3 questions)</button>
          <button class="chip" onclick="note('More reflective (add feeling check)')">More reflective (add feeling check)</button>
          <button class="chip" onclick="note('Action‑biased (force next steps)')">Action‑biased (force next steps)</button>
          <button class="chip" onclick="note('Manager view (add stakeholder note)')">Manager view (add stakeholder note)</button>
        </div>
      </div>
      <div class="section banner">Pro Tip — Keep reflection prompts consistent but allow for personal interpretation.</div>
      <div class="sp-12"></div>
      <div class="cta-row">
        <button class="cta-primary" onclick="openTask(1)">Try the Task</button>
      </div>
    </section>

    <section id="s2" class="hidden">
      <h2>Weekly Review Template</h2>
      <div class="section">
        <h3>Situation</h3>
        <p class="muted">You need a 10‑minute weekly review that turns notes into a Monday plan.</p>
      </div>
      <div class="section">
        <h3>What to Ask AI</h3>
        <p class="muted">“Summarize my week from the notes below and create a Monday action plan. Use sections: Highlights, Metrics, Lessons, Risks, Next‑Week Plan (with owners &amp; time boxes). Notes: &lt;paste bullets&gt;.”</p>
      </div>
      <div class="section">
        <h3>AI's Response</h3>
        <p><b>Highlights:</b> …<br/><b>Metrics:</b> …<br/><b>Lessons:</b> …<br/><b>Risks:</b> …<br/><b>Next‑Week Plan:</b> 1) … (Owner, 90m) 2) … (Owner, 45m)</p>
      </div>
      <div class="section">
        <h3>Adjust the Result</h3>
        <div class="chips">
          <button class="chip" onclick="note('Add metrics table')">Add metrics table</button>
          <button class="chip" onclick="note('Reduce to one‑pager')">Reduce to one‑pager</button>
          <button class="chip" onclick="note('Executive tone')">Executive tone</button>
          <button class="chip" onclick="note('Include calendar blocks')">Include calendar blocks</button>
        </div>
      </div>
      <div class="section banner">Pro Tip — Convert “Next‑Week Plan” into calendar holds immediately.</div>
      <div class="cta-row">
        <button class="cta-primary" onclick="openTask(2)">Try the Task</button>
      </div>
    </section>

    <section id="s3" class="hidden">
      <h2>Goal Progress Tracking</h2>
      <div class="section">
        <h3>Situation</h3>
        <p class="muted">You felt overwhelmed today; you want a calm, factual summary and one concrete next step.</p>
      </div>
      <div class="section">
        <h3>What to Ask AI</h3>
        <p class="muted">“Act as a cognitive coach. Reframe the following stressful event using: Facts, Thoughts, Alternative View, One Next Step. Keep it supportive, professional, and under 120 words. Event: &lt;describe&gt;.”</p>
      </div>
      <div class="section">
        <h3>AI's Response</h3>
        <p><b>Facts:</b> …<br/><b>Thoughts:</b> …<br/><b>Alternative View:</b> …<br/><b>One Next Step:</b> …</p>
      </div>
      <div class="section">
        <h3>Adjust the Result</h3>
        <div class="chips">
          <button class="chip" onclick="note('Shorter (≤80 words)')">Shorter (≤80 words)</button>
          <button class="chip" onclick="note('More empathetic')">More empathetic</button>
          <button class="chip" onclick="note('Data‑driven framing')">Data‑driven framing</button>
          <button class="chip" onclick="note('Add checklist for tomorrow')">Add checklist for tomorrow</button>
        </div>
      </div>
      <div class="section banner">Pro Tip — Name the feeling → write the fact → choose one step. That’s the reset.</div>
      <div class="cta-row">
        <button class="cta-primary" onclick="openTask(3)">Try the Task</button>
      </div>
    </section>

    <!-- TASK CHECK (mocked, like the multiple-choice checklist & result) -->
    <section id="task" class="hidden">
      <h2 id="taskTitle">Daily Reflection Prompts</h2>
      <div class="section banner">Task Goal — <span id="taskGoal">Create 5 daily reflection prompts for productivity and growth.</span></div>
      <h3 style="margin-top:16px">Select the prompt pieces:</h3>
      <div id="options"></div>
      <div class="sp-12"></div>
      <div class="two">
        <button class="cta-ghost" onclick="skipTask()">Skip</button>
        <button class="cta-outline" onclick="checkTask()" id="checkBtn" disabled>Check My Answer</button>
      </div>
      <div class="sp-24"></div>
      <div id="result" class="hidden ok">
        <b>Correct!</b> Great job! You selected the right prompt pieces.
      </div>
      <div id="assembled" class="hidden section">
        <h3>Your assembled prompt:</h3>
        <input id="promptOut" style="width:100%;padding:12px;border:1px solid #d0d5dd;border-radius:12px" value=""/>
        <p class="muted" id="kicker" style="margin-top:10px"></p>
      </div>
      <div class="sp-12"></div>
      <button class="cta-primary" onclick="completeScenario()">Done</button>
    </section>

    <!-- SCENARIO COMPLETE -->
    <section id="complete" class="hidden">
      <div class="card" style="text-align:center">
        <div style="font-size:64px;color:var(--ok)">✔</div>
        <h2>Great job!</h2>
        <p class="muted" id="completeMsg">You've completed the scenario.</p>
        <div class="section banner" id="takeaway">Key Takeaway — …</div>
        <div class="sp-12"></div>
        <div class="two">
          <button class="cta-ghost" onclick="goHome()">Back to Tracks</button>
          <button class="cta-primary" onclick="goAnother()">Another Scenario</button>
        </div>
      </div>
    </section>

  </main>

  <script>
    function goHome(){
      document.querySelectorAll('main > section').forEach(s=>s.classList.add('hidden'));
      document.getElementById('picker').classList.remove('hidden');
      document.querySelector('header h1').textContent = 'Choose a Scenario';
    }

    function openScenario(n){
      document.querySelectorAll('main > section').forEach(s=>s.classList.add('hidden'));
      document.getElementById('s'+n).classList.remove('hidden');
      const title = ['Daily Reflection Prompts','Weekly Review Template','Goal Progress Tracking'][n-1];
      document.querySelector('header h1').textContent = title;
      window.scrollTo({top:0,behavior:'smooth'});
    }

    // Simple toast for chip clicks
    function note(text){
      console.log('Adjust chip:', text);
    }

    // --- Task mock (mirrors your screenshots) ---
    const taskData = {
      1: {
        goal: 'Create 5 daily reflection prompts for productivity and growth.',
        options: [
          ['Include win/achievement prompt', true],
          ['Add challenge/learning prompt', true],
          ['Include improvement prompt', true],
          ['Add gratitude prompt', true],
          ['Make prompts actionable', true]
        ],
        assembled: 'Create 5 daily reflection prompts covering wins, challenges, learning, improvement, and gratitude.',
        kicker: 'Balanced reflection prompts cover wins, challenges, learning, and gratitude.',
        completeMsg: "You've completed scenario Daily Reflection Prompts",
        takeaway: 'Structured reflection prompts deepen self‑awareness and growth.'
      },
      2: {
        goal: 'Turn last week\'s notes into a Monday plan with Highlights, Metrics, Lessons, Risks, and a Next‑Week Plan.',
        options: [
          ['Add highlights section', true],
          ['Include metrics and targets', true],
          ['Capture lessons & risks', true],
          ['Create next‑week plan with owners & time boxes', true]
        ],
        assembled: 'Summarize last week and produce a Monday plan with Highlights, Metrics, Lessons, Risks and a Next‑Week Plan (owners, time boxes).',
        kicker: 'A review matters only if it ends in scheduled actions.',
        completeMsg: "You've completed scenario Weekly Review Template",
        takeaway: 'A review is only useful if it ends in scheduled actions.'
      },
      3: {
        goal: 'Reframe a stressful event into Facts, Thoughts, Alternative View, One Next Step (≤120 words).',
        options: [
          ['State the facts objectively', true],
          ['Name the thought/emotion', true],
          ['Offer an alternative view', true],
          ['Pick one next step', true]
        ],
        assembled: 'Reframe the event using Facts, Thoughts, Alternative View, and One Next Step in ≤120 words.',
        kicker: 'Name the feeling → write the fact → choose one step.',
        completeMsg: "You've completed scenario Goal Progress Tracking",
        takeaway: 'Reframing turns noise into a next step you control.'
      }
    };

    let currentTask = 1;

    function openTask(n){
      currentTask = n;
      const t = taskData[n];
      document.querySelectorAll('main > section').forEach(s=>s.classList.add('hidden'));
      const picker = document.getElementById('task');
      picker.classList.remove('hidden');
      document.querySelector('header h1').textContent = ['Daily Reflection Prompts','Weekly Review Template','Goal Progress Tracking'][n-1];
      document.getElementById('taskTitle').textContent = document.querySelector('header h1').textContent;
      document.getElementById('taskGoal').textContent = t.goal;
      const box = document.getElementById('options');
      box.innerHTML = '';
      t.options.forEach((opt, i)=>{
        const id = 'opt'+i;
        const row = document.createElement('label');
        row.className = 'section';
        row.innerHTML = `<div style="display:flex;align-items:center;gap:12px"><input type="checkbox" id="${id}" onchange="enableCheck()"/><span>${opt[0]}</span></div>`;
        box.appendChild(row);
      });
      document.getElementById('result').classList.add('hidden');
      document.getElementById('assembled').classList.add('hidden');
      document.getElementById('checkBtn').disabled = true;
      window.scrollTo({top:0,behavior:'smooth'});
    }

    function enableCheck(){
      const anyChecked = !!document.querySelector('#options input:checked');
      document.getElementById('checkBtn').disabled = !anyChecked;
    }

    function skipTask(){
      // Show Scenario Incomplete mimic
      alert('Not finished yet — You skipped the task.');
    }

    function checkTask(){
      const t = taskData[currentTask];
      document.getElementById('result').classList.remove('hidden');
      document.getElementById('assembled').classList.remove('hidden');
      document.getElementById('promptOut').value = t.assembled;
      document.getElementById('kicker').textContent = t.kicker;
      window.scrollTo({top:document.getElementById('result').offsetTop-20,behavior:'smooth'});
    }

    function completeScenario(){
      const t = taskData[currentTask];
      document.querySelectorAll('main > section').forEach(s=>s.classList.add('hidden'));
      const done = document.getElementById('complete');
      done.classList.remove('hidden');
      document.getElementById('completeMsg').textContent = t.completeMsg;
      document.getElementById('takeaway').textContent = 'Key Takeaway — ' + t.takeaway;
      document.querySelector('header h1').textContent = 'Scenario Complete';
      window.scrollTo({top:0,behavior:'smooth'});
    }

    function goAnother(){
      goHome();
    }

    // default: show picker
    goHome();
  </script>
</body>
</html>
