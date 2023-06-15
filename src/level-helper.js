export async function getStage (stageIndex) {
  // lade das level aus der spezifischen level_x.json
  const stage = await fetch(`../assets/level_${stageIndex}.json`)
  return await stage.json()
}
