// Format duration as MM:SS
export const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatHoursDuration = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
};

// Calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const f1 = lat1 * Math.PI / 180;
    const f2 = lat2 * Math.PI / 180;
    const df = (lat2 - lat1) * Math.PI / 180;
    const dl = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(df / 2) * Math.sin(df / 2) +
        Math.cos(f1) * Math.cos(f2) *
        Math.sin(dl / 2) * Math.sin(dl / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

// Calculate acceleration magnitude
export const calculateAccelMagnitude = (x: number, y: number, z: number) => {
    return Math.sqrt(x * x + y * y + z * z).toFixed(2);
};