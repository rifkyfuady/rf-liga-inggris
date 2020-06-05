const Notifikasi = {
    requestPermission: () => {
        Notification.requestPermission().then(function(result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }
            console.log("Fitur notifikasi diijinkan.");
        })
    },
    showNotifikasiSederhana: () => {
        const title = 'Notifikasi Sederhana';
        const options = {
            'body': 'Ini adalah konten notifikasi. \nBisa menggunakan baris baru.',
        }
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification(title, options);
            });
        } else {
            console.error('Fitur notifikasi tidak diijinkan.');
        }
    }
}

export default Notifikasi;