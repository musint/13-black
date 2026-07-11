(function () {
  function formatDate(iso) {
    var parts = iso.split('-').map(Number);
    var date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function renderTimeline(container, noteEl, phases, weeks, status) {
    container.innerHTML = '';
    phases.forEach(function (phase) {
      var isActive = status.state === 'during' &&
        (status.weekIndex + 1) >= phase.weeks[0] &&
        (status.weekIndex + 1) <= phase.weeks[1];

      var el = document.createElement('div');
      el.className = 'phase' + (isActive ? ' active' : '');
      el.innerHTML =
        '<div class="phase-name">' + phase.name + '</div>' +
        '<div class="phase-weeks">Weeks ' + phase.weeks[0] + '-' + phase.weeks[1] + '</div>';

      if (isActive) {
        var pin = document.createElement('div');
        pin.className = 'pin';
        pin.textContent = 'You are here · Week ' + (status.weekIndex + 1);
        el.appendChild(pin);
      }
      container.appendChild(el);
    });

    if (status.state === 'before') {
      noteEl.textContent = 'Season starts ' + formatDate(weeks[0].rangeStart) + '.';
    } else if (status.state === 'after') {
      noteEl.textContent = 'Season complete. Thanks for a great fall!';
    } else {
      noteEl.textContent = '';
    }
  }

  function renderWeekList(container, weeks, finale, status) {
    container.innerHTML = '';
    weeks.forEach(function (week, i) {
      var card = document.createElement('div');
      var cls = 'week-card';
      if (status.state === 'during' && i === status.weekIndex) cls += ' current';
      else if (status.state === 'after' || (status.state === 'during' && i < status.weekIndex)) cls += ' past';
      card.className = cls;
      card.id = 'week-' + week.num;
      card.innerHTML =
        '<div class="week-head">' +
          '<h3>Week ' + week.num + ': ' + week.title + '</h3>' +
          '<span class="week-dates">' + formatDate(week.rangeStart) + ' to ' + formatDate(week.rangeEnd) + '</span>' +
          '<span class="week-phase chip">' + week.phase + '</span>' +
        '</div>' +
        '<p><strong>Mon:</strong> ' + week.mon + '</p>' +
        '<p><strong>Wed:</strong> ' + week.wed + '</p>';
      container.appendChild(card);
    });

    var finaleCard = document.createElement('div');
    finaleCard.className = 'week-card' + (status.state === 'after' ? ' past' : '');
    finaleCard.id = 'week-finale';
    finaleCard.innerHTML =
      '<div class="week-head">' +
        '<h3>' + finale.label + '</h3>' +
        '<span class="week-dates">' + formatDate(finale.date) + '</span>' +
      '</div>' +
      '<p>Tape-flip contest, one-arm series demo, mixed-draft scrimmages on all four courts, league and category awards, report cards handed to families.</p>';
    container.appendChild(finaleCard);
  }

  function getAsOfString(data) {
    var params = new URLSearchParams(window.location.search);
    var asOf = params.get('asof');
    if (asOf && /^\d{4}-\d{2}-\d{2}$/.test(asOf)) return asOf;
    return data.toISODate(new Date());
  }

  document.addEventListener('DOMContentLoaded', function () {
    var data = window.FallBallData;
    var asOfStr = getAsOfString(data);
    var status = data.getProgramStatus(data.WEEKS, data.SEASON, asOfStr);
    renderTimeline(
      document.getElementById('phase-timeline'),
      document.getElementById('timeline-note'),
      data.PHASES, data.WEEKS, status
    );
    renderWeekList(
      document.getElementById('week-list'),
      data.WEEKS, data.FINALE, status
    );
  });
})();
