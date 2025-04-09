export async function saveMatchStats(stats) {
    return new Promise(resolve => {
        console.log("Saving stats", stats);
        setTimeout(resolve, 1000);
    });
}
