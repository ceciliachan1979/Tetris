class Random implements IRandom {
    random(): number {
        return Math.floor(Math.random() * 1000);
    }
}