import { showWedge, hideWedge } from '../utilities/loadingIndicatorWedge.mjs';

export async function fetchTrendingGames() {
    showWedge();

    try {
        const gameIds = [
            "2bbaab8b-57b0-47f6-ab8d-8d443ac767da",
            "cac3b2cd-1611-4007-9883-3adf6f74948f",
            "26594301-ad8e-4691-a2ca-c774f50b1b21"
        ];

        const trendingGames = [];

        for (const id of gameIds) {
            const response = await fetch(`https://api.noroff.dev/api/v1/gamehub/${id}`);
            const game = await response.json();
            trendingGames.push(game);
        }

        return trendingGames;
    } catch (error) {
        console.error("Failed to fetch trending games:", error);
    } finally {
        hideWedge();
    }
}

export async function fetchAllGames() {
    showWedge();

    try {
        const response = await fetch("https://api.noroff.dev/api/v1/gamehub");
        const games = await response.json();
        sessionStorage.setItem("games", JSON.stringify(games));
        return games;
    } catch (error) {
        console.error("Failed to fetch games:", error);
    } finally {
        hideWedge();
    }
}
