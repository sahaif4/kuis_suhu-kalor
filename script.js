const questions = [
    {
        question: "Pada sistem pendingin mesin traktor, komponen yang berfungsi membuang panas air pendingin ke udara bebas melalui sirip-sirip adalah...",
        options: ["Thermostat", "Water Pump", "Radiator", "Kipas Pendingin"],
        correct: 2 // Radiator
    },
    {
        question: "Dalam proses pengeringan gabah (grain drying), perpindahan panas yang terjadi dari udara panas ke permukaan gabah didominasi oleh mekanisme...",
        options: ["Konduksi", "Konveksi", "Radiasi", "Induksi"],
        correct: 1 // Konveksi
    },
    {
        question: "Mengapa air sering digunakan sebagai fluida pendingin pada mesin diesel pertanian?",
        options: ["Karena memiliki kalor jenis (specific heat) yang tinggi", "Karena titik didihnya rendah", "Karena massa jenisnya ringan", "Karena mudah membeku"],
        correct: 0 // Kalor jenis tinggi
    },
    {
        question: "Pada langkah kompresi mesin diesel 4-tak, udara ditekan sehingga suhunya meningkat drastis. Kenaikan suhu ini disebabkan oleh...",
        options: ["Pembakaran bahan bakar", "Gesekan piston", "Kompresi adiabatik", "Percikan busi"],
        correct: 2 // Kompresi adiabatik
    },
    {
        question: "Alat yang digunakan untuk mengukur kelembaban udara (Relative Humidity) dalam penyimpanan benih, yang memanfaatkan perbedaan suhu bola kering dan bola basah adalah...",
        options: ["Thermocouple", "Psychrometer", "Pyrometer", "Manometer"],
        correct: 1 // Psychrometer
    },
    {
        question: "Efek rumah kaca (greenhouse effect) pada bangunan pertanian terjadi karena atap transparan...",
        options: ["Memantulkan semua radiasi matahari", "Meneruskan gelombang pendek matahari tetapi menahan gelombang panjang dari dalam", "Menyerap semua panas matahari", "Mendinginkan udara di dalam"],
        correct: 1 // Shortwave in, longwave trapped
    },
    {
        question: "Bahan isolator yang baik untuk dinding ruang pendingin (cold storage) hasil pertanian harus memiliki sifat...",
        options: ["Konduktivitas termal tinggi", "Konduktivitas termal rendah", "Kapasitas kalor rendah", "Massa jenis tinggi"],
        correct: 1 // Low thermal conductivity
    },
    {
        question: "Satuan standar daya mesin pertanian sering dinyatakan dalam Horse Power (HP). 1 HP setara dengan berapa watt (sistem imperial)?",
        options: ["746 Watt", "1000 Watt", "500 Watt", "980 Watt"],
        correct: 0 // 746 Watt
    },
    {
        question: "Proses perpindahan panas secara radiasi yang paling utama dalam pertanian adalah...",
        options: ["Panas dari mesin ke operator", "Energi matahari untuk fotosintesis dan pengeringan alami", "Panas dari tanah ke akar", "Aliran udara dalam silo"],
        correct: 1 // Matahari
    },
    {
        question: "Pada mesin pengering buatan (artificial dryer), efisiensi termal dipengaruhi oleh...",
        options: ["Warna cat mesin", "Suhu udara pengering dan aliran udara", "Merk mesin", "Jenis roda penggerak"],
        correct: 1 // Suhu dan aliran udara
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let userInfo = { name: '', nim: '' };

// Timer & Anti-Cheat Variables
let timerInterval;
const QUIZ_DURATION_MINUTES = 15; // Durasi kuis dalam menit
let timeLeft = QUIZ_DURATION_MINUTES * 60;
let violationCount = 0;
const MAX_VIOLATIONS = 1; // Maksimal pelanggaran (pindah tab/aplikasi) sebelum auto-submit

// URL Google Apps Script
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxF0jKayX355pKU2V2Z7gT-U9Ov9fiGsN0sW6EwKLhTotYRHb21cwPX1twfxL54D1t5/exec"; 

// DOM Elements
const loginPage = document.getElementById('login-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');
const loginForm = document.getElementById('login-form');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const questionNumber = document.getElementById('question-number');
const resultNama = document.getElementById('result-nama');
const resultNim = document.getElementById('result-nim');
const scoreValue = document.getElementById('score-value');
const statusText = document.getElementById('status-text');
const sendingStatus = document.getElementById('sending-status');
const completionMessage = document.getElementById('completion-message');

// Event Listeners
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userInfo.name = document.getElementById('nama').value;
    userInfo.nim = document.getElementById('nim').value;
    
    if (userInfo.name && userInfo.nim) {
        requestFullScreen();
        startQuiz();
    }
});

// Anti-Cheat: Visibility Change (Deteksi pindah tab/minimaze)
document.addEventListener("visibilitychange", handleVisibilityChange);

function handleVisibilityChange() {
    if (document.hidden && quizPage.classList.contains('active')) {
        violationCount++;
        if (violationCount > MAX_VIOLATIONS) {
            alert("PELANGGARAN: Anda terdeteksi meninggalkan halaman kuis berulang kali. Kuis akan dihentikan otomatis!");
            finishQuiz();
        } else {
            alert(`PERINGATAN: Dilarang meninggalkan halaman kuis! (Pelanggaran ${violationCount}/${MAX_VIOLATIONS})`);
        }
    }
}

function requestFullScreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(err => {
            console.log("Fullscreen ditolak atau tidak didukung");
        });
    }
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        finishQuiz();
    }
});

function startQuiz() {
    loginPage.classList.remove('active');
    loginPage.classList.add('hidden');
    quizPage.classList.remove('hidden');
    quizPage.classList.add('active');
    
    // Reset Timer
    timeLeft = QUIZ_DURATION_MINUTES * 60;
    startTimer();
    
    loadQuestion();
}

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Waktu Habis! Jawaban Anda akan dikirim otomatis.");
            finishQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerDisplay = document.getElementById('timer');
    if (timerDisplay) {
        timerDisplay.textContent = `Waktu: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Warna merah jika waktu < 1 menit
        if (timeLeft < 60) {
            timerDisplay.style.color = 'red';
        }
    }
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    questionNumber.textContent = `Soal ${currentQuestionIndex + 1}/${questions.length}`;
    
    optionsContainer.innerHTML = '';
    nextBtn.disabled = true;

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.onclick = () => selectOption(index, button);
        optionsContainer.appendChild(button);
    });
}

function selectOption(index, button) {
    // Remove selected class from all buttons
    const buttons = optionsContainer.getElementsByClassName('option-btn');
    for (let btn of buttons) {
        btn.classList.remove('selected');
    }
    
    // Add selected class to clicked button
    button.classList.add('selected');
    
    // Save answer
    userAnswers[currentQuestionIndex] = index;
    nextBtn.disabled = false;
    
    // Change button text based on whether it's the last question
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = "Selesai";
    } else {
        nextBtn.textContent = "Lanjut";
    }
}

function finishQuiz() {
    clearInterval(timerInterval); // Stop timer
    
    // Keluar dari fullscreen saat selesai (opsional)
    if (document.exitFullscreen) {
        document.exitFullscreen().catch(e => console.log(e));
    }

    calculateScore();
    quizPage.classList.remove('active');
    quizPage.classList.add('hidden');
    resultPage.classList.remove('hidden');
    resultPage.classList.add('active');
    
    resultNama.textContent = userInfo.name;
    resultNim.textContent = userInfo.nim;
    scoreValue.textContent = score;
    
    // Penentuan Status Remedial/Lulus
    const status = score > 65 ? "LULUS" : "REMEDIAL";
    if (statusText) {
        statusText.textContent = `Status: ${status}`;
        statusText.style.color = score > 65 ? "#2ecc71" : "#e74c3c";
    }
    
    // Kirim data ke Google Sheet
    sendToGoogleSheets(status);
}

function calculateScore() {
    let correctCount = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === questions[index].correct) {
            correctCount++;
        }
    });
    score = correctCount * 10; // Assuming 10 questions, max score 100
}

function sendToGoogleSheets(status) {
    if (GOOGLE_SCRIPT_URL.includes("URL_GOOGLE_APPS_SCRIPT_ANDA_DISINI")) {
        if (sendingStatus) sendingStatus.textContent = "⚠️ Error: URL Database belum disetting oleh Admin.";
        return;
    }

    // Ganti JSON dengan URLSearchParams (Form Data) agar lebih stabil di semua browser
    const formData = new URLSearchParams();
    formData.append('timestamp', new Date().toLocaleString('id-ID'));
    formData.append('nama', userInfo.name);
    formData.append('nim', userInfo.nim);
    formData.append('nilai', score);
    formData.append('status', status);
    formData.append('pelanggaran', violationCount);

    // Debug log
    console.log("Mengirim data ke:", GOOGLE_SCRIPT_URL);
    console.log("Data:", formData.toString());

    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Penting agar tidak error CORS di browser
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
    })
    .then(response => {
        // Karena no-cors, response akan selalu 'opaque' (status 0), jadi kita anggap sukses jika tidak masuk catch
        console.log("Data terkirim (no-cors mode)");
        if (sendingStatus) sendingStatus.style.display = 'none';
        if (completionMessage) completionMessage.classList.remove('hidden');
    })
    .catch(error => {
        console.error('Error sending data:', error);
        if (sendingStatus) {
            sendingStatus.textContent = "Gagal mengirim data. Silakan screenshot halaman ini.";
            sendingStatus.style.color = "red";
        }
    });
}
