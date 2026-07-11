(function (exports) {
  var SEASON = { start: '2026-08-10', end: '2026-10-02' };

  var PHASES = [
    { name: 'Foundations', weeks: [1, 2] },
    { name: 'Ball Control Engine', weeks: [3, 4] },
    { name: 'System', weeks: [5, 6] },
    { name: 'Compete', weeks: [7, 8] },
  ];

  var WEEKS = [
    { num: 1, rangeStart: '2026-08-10', rangeEnd: '2026-08-16', phase: 'Foundations', title: 'Install',
      mon: 'Culture standards installed. One-arm series (beginner) introduced. Serve: tape progression part 1. Teach: platform formation and balance. System: partner passing progressions. Closer: Speedball.',
      wed: 'Baseline testing night — four stations (serving, passing, OOS setting, approach touch) set the starting numbers for every player. The standards ladder goes up on the wall.' },
    { num: 2, rangeStart: '2026-08-17', rangeEnd: '2026-08-23', phase: 'Foundations', title: 'Serve + Armswing',
      mon: 'One-arm counted night. Serve: kneel + single-leg toss, then tape progression part 2. Teach: standing armswing. System: tilt family and weave (pass version). Closer: Mountain D.',
      wed: 'Serve: tape part 2 plus first noodle target. Application: the approach and the exchange. League Night 1 — standards races and an all-gym tape-flip war.' },
    { num: 3, rangeStart: '2026-08-24', rangeEnd: '2026-08-30', phase: 'Ball Control Engine', title: 'Ball Control Engine Begins',
      mon: 'One-arm goes advanced. Serve: tape part 3, now against live serves. Teach: rotational passing. System: weave progressions (set version). Closer: Campfire D.',
      wed: 'Serve: seam-box target. Application: pepper series steps 1 through 3. League 2 — Biggie Smalls, the first 6v6 engine with new squads.' },
    { num: 4, rangeStart: '2026-08-31', rangeEnd: '2026-09-06', phase: 'Ball Control Engine', title: 'Setting + Directional Control',
      mon: 'Serve: seam bounce target; advanced group starts jump float serving. Teach: setting fundamentals. System: Spanish Four-Corner and Directional Pass. Closer: Figure Eight.',
      wed: 'Application: Four-Corner part 3 and two-ball passing volume. League 3 — Momentum. Mid-program parent email goes out.' },
    { num: 5, rangeStart: '2026-09-07', rangeEnd: '2026-09-13', phase: 'System', title: 'Out-of-System Install',
      mon: 'Off — Labor Day.',
      wed: 'Packed session: the out-of-system doctrine and Five-and-Five (bad ball, set five off, five in). Application: Five-and-Five Setting into the Mia Drill. League 4 — Net Six.' },
    { num: 6, rangeStart: '2026-09-14', rangeEnd: '2026-09-20', phase: 'System', title: 'Defense + Coverage',
      mon: 'Teach: individual defense fundamentals. System: Three-Way Release, Seat to Seam, and Go Stay. Closer: Mountain D with live dig-outs.',
      wed: 'Application: full coverage progression, digs through to a live swing. League 5 — Hand-to-Hand Combat.' },
    { num: 7, rangeStart: '2026-09-21', rangeEnd: '2026-09-27', phase: 'Compete', title: 'Compete Doctrine',
      mon: 'Teach: the compete doctrine and Reverse Fire rules. System: Reverse Fire. Closer: 32.',
      wed: 'Application: the Lamb progression. League 6 — the ARKANSAS capstone, calibrated for 13s.' },
    { num: 8, rangeStart: '2026-09-28', rangeEnd: '2026-10-04', phase: 'Compete', title: 'Peak + Retest',
      mon: 'Retest all baselines from Week 1, then Spanish Six. Closer: Finish Strong.',
      wed: 'Light tune-up and an all-gym serving war. League Championship Night — seeded finals in the 5-4-3-2-1 format.' },
  ];

  var FINALE = { date: '2026-10-02', label: 'Families Night' };

  function toISODate(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function getProgramStatus(weeks, season, today) {
    var todayStr = typeof today === 'string' ? today : toISODate(today);
    if (todayStr < season.start) return { state: 'before', weekIndex: null };
    if (todayStr > season.end) return { state: 'after', weekIndex: null };
    for (var i = 0; i < weeks.length; i++) {
      if (todayStr >= weeks[i].rangeStart && todayStr <= weeks[i].rangeEnd) {
        return { state: 'during', weekIndex: i };
      }
    }
    return { state: 'after', weekIndex: null };
  }

  exports.SEASON = SEASON;
  exports.PHASES = PHASES;
  exports.WEEKS = WEEKS;
  exports.FINALE = FINALE;
  exports.toISODate = toISODate;
  exports.getProgramStatus = getProgramStatus;
})(typeof module !== 'undefined' && module.exports ? module.exports : (window.FallBallData = {}));
