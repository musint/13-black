(function (exports) {
  var SEASON = { start: '2026-08-10', end: '2026-10-02' };

  var PHASES = [
    { name: 'Ball Control Engine', weeks: [1, 2] },
    { name: 'Defense', weeks: [3, 4] },
    { name: 'Attacking', weeks: [5, 6] },
    { name: 'Systems & Out of System', weeks: [7, 8] },
  ];

  var WEEKS = [
    { num: 1, rangeStart: '2026-08-10', rangeEnd: '2026-08-16', phase: 'Ball Control Engine', title: 'Install',
      mon: 'Culture standards installed. One-arm series (beginner) introduced. Serve: tape progression part 1. Teach: platform formation and balance. System: partner passing progressions. Closer: Speedball.',
      wed: 'Baseline testing night. Four stations (serving, passing, OOS setting, approach touch) set the starting numbers for every player. Initial court placements and the positional depth chart go up.' },
    { num: 2, rangeStart: '2026-08-17', rangeEnd: '2026-08-23', phase: 'Ball Control Engine', title: 'Ball Control Ramp',
      mon: 'One-arm goes advanced. Serve: kneel + single-leg toss, then tape progression part 2. Teach: rotational passing. System: tilt family and weave (pass version). Closer: Mountain D.',
      wed: 'Serve: tape part 2 plus first noodle target. Application: pepper series steps 1 through 3. League Night 1: free ball entry wash games and an all-gym tape-flip war.' },
    { num: 3, rangeStart: '2026-08-24', rangeEnd: '2026-08-30', phase: 'Defense', title: 'Defense Install',
      mon: 'Teach: individual defense fundamentals, read and run. System: Three-Way Release, Seat to Seam, and Go Stay. Serve: tape part 3, now against live serves. Closer: Mountain D with live dig-outs.',
      wed: 'Application: full coverage progression, digs through to a live swing. Serve: seam-box target. League 2: Hand-to-Hand Combat.' },
    { num: 4, rangeStart: '2026-08-31', rangeEnd: '2026-09-06', phase: 'Defense', title: 'Coverage, Then the Attack Bridge',
      mon: 'Serve: seam bounce target; advanced group starts jump float serving. Teach: standing armswing, the bridge skill into next phase. System: weave progressions (two balls). Closer: Campfire D.',
      wed: 'Application: the approach and the exchange, coach-toss hitting. League 3: Momentum. Mid-program parent email goes out.' },
    { num: 5, rangeStart: '2026-09-07', rangeEnd: '2026-09-13', phase: 'Attacking', title: 'Attack Install',
      mon: 'Off for Labor Day.',
      wed: 'Packed session: compete doctrine and Reverse Fire rules, taught live. System: Reverse Fire part 1. Closer: 32. League 4: Biggie Smalls, the first 6v6 engine with new squads.' },
    { num: 6, rangeStart: '2026-09-14', rangeEnd: '2026-09-20', phase: 'Attacking', title: 'Attack Under Pressure',
      mon: 'System: Reverse Fire part 2, full rules. Application: the Lamb progression, exchange-compete version. Serve: Five Before Ten.',
      wed: 'Application: the Lamb progression, restricted-setters version. League 5: Momentum.' },
    { num: 7, rangeStart: '2026-09-21', rangeEnd: '2026-09-27', phase: 'Systems & Out of System', title: 'Systems + OOS Install',
      mon: 'Teach: setting fundamentals. System: Spanish Four-Corner and Directional Pass. Closer: Figure Eight.',
      wed: 'Teach: the out-of-system doctrine and Five-and-Five (bad ball, set five off, five in). Application: Four-Corner part 3 and the Mia Drill. League 6: Net Six.' },
    { num: 8, rangeStart: '2026-09-28', rangeEnd: '2026-10-04', phase: 'Systems & Out of System', title: 'Peak + Retest',
      mon: 'Retest all baselines from Week 1, then Spanish Six and an Arkansas scrimmage. Closer: Finish Strong.',
      wed: 'Light tune-up, an all-gym serving war, and two-ball passing volume. League Championship Night: seeded finals in the 5-4-3-2-1 format.' },
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
