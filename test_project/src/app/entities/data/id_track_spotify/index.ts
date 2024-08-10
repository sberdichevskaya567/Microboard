const searchTrack = async (query) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
        headers: {
            'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`
        }
    });
    const data = await response.json();
    return data.tracks.items; // Возвращает массив треков
};