## Aplikasi Liga Inggris sumber data dari football-data.org

1. Terdapat 6 halaman yaitu Klasemen, Jadwal, Klub, Jadwal Tersimpan, Klub Tersimpan dan Halaman 404 serta mengonsumsi data dari website football-data.org;
2. Menerapkan cache stratergi CacheFirst(workbox-precache,football-img) & StaleWhileRevalidate(football-data);
3. Memiliki fitur penyimpanan data dengan indexed db (bisa menambahkan, menampilkan, dan menghapus tim favorit, jadwal nonton, dsb.);
4. Dapat menampilkan pesan push dari server (FCM);
5. Dapat ditambahkan ke homescreen & memiliki Splash screen;
6. Menerapkan modular kode, menggunakan build tools NPM serta memakai module bundler webpack, babel, dkk.
7. Untuk mengirimkan Notification Payload dengan Web Push, jangan lupa melakukan symlink global modul web-push kedalam project push dengan perintah `npm link web-push`

