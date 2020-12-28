const { generateReport } = require('./expenseReportGenerator');

describe("generateReport tests", () => {
  test(`should compare results for username: "moshe", startDate: "15/06/2017", endDate: "15/07/2017 with expected`, async () => {
    const expected = {
      BILLS: 261,
      PUBLIC_TRANSPORTATION: 301,
      VACATION: 335,
      NO_CATEGORY: 275
    }

    const received = await generateReport({ username: "moshe", startDate: "15/06/2017", endDate: "15/07/2017" })
    const result = if_objects_equal(expected, received)

    expect(result).toBeTruthy();
  });

  test(`should compare results for username: "moshe" for all the time`, async () => {
    const expected = {
      PUBLIC_TRANSPORTATION: 4491,
      EATING_OUT: 5675,
      CAR_MAINTENANCE: 1714,
      BILLS: 2293,
      VACATION: 4434,
      MEDICAL: 648,
      NO_CATEGORY: 275
    }

    const received = await generateReport({ username: "moshe" })
    const result = if_objects_equal(expected, received)

    expect(result).toBeTruthy();
  });
});


function if_objects_equal(expected, received) {
  if (typeof expected !== 'object' || typeof received !== 'object') return false
  if (Object.keys(expected).length !== Object.keys(received).length) return false

  const expected_keys = Object.keys(expected);
  const len = expected_keys.length;

  for (let i = 0; i < len; i++) {
    const key = expected_keys[i];
    if (expected[key] !== received[key]) return false;
  }

  return true;
}
