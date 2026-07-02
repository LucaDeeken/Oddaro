function factorial(n: number) {
  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

export function poissonProbability(goals: number, expectedGoals: number) {
  return (
    (Math.exp(-expectedGoals) * Math.pow(expectedGoals, goals)) /
    factorial(goals)
  );
}
