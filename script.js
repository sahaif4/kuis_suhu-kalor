const questions = [
    {
        question: "Apakah satuan SI untuk suhu?",
        options: ["Celcius", "Fahrenheit", "Kelvin", "Reamur"],
        correct: 2 // Index of 'Kelvin'
    },
    {
        question: "Kalor berpindah dari benda bersuhu ... ke benda bersuhu ...",
        options: ["Rendah ke tinggi", "Tinggi ke rendah", "Tetap ke berubah", "Dingin ke panas"],
        correct: 1
    },
    {
        question: "Perpindahan kalor tanpa disertai perpindahan partikel zat disebut...",
        options: ["Konduksi", "Konveksi", "Radiasi", "Evaporasi"],
        correct: 0
    },
    {
        question: "Banyaknya kalor yang diperlukan untuk menaikkan suhu 1 kg zat sebesar 1°C disebut...",
        options: ["Kapasitas kalor", "Kalor jenis", "Kalor lebur", "Kalor uap"],
        correct: 1
    },
    {
        question: "Alat untuk mengukur suhu adalah...",
        options: ["Barometer", "Termometer", "Higrometer", "Manometer"],
        correct: 1
    },
    {
        question: "Suhu 100°C sama dengan ... °F",
        options: ["180", "212", "32", "273"],
        correct: 1 // (100 * 9/5) + 32 = 212
    },
    {
        question: "Perpindahan kalor yang disertai dengan perpindahan partikel zat disebut...",
        options: ["Konduksi", "Konveksi", "Radiasi", "Isolasi"],
        correct: 1
    },
    {
        question: "Contoh perpindahan kalor secara radiasi adalah...",
        options: ["Ujung logam dipanaskan", "Air mendidih", "Panas matahari sampai ke bumi", "Angin darat dan angin laut"],
        correct: 2
    },
    {
        question: "Rumus untuk menghitung kalor (Q) adalah...",
        options: ["Q = m . c . ΔT", "Q = m . g . h", "Q = F . s", "Q = V . I"],
        correct: 0
    },
    {
        question: "Saat air membeku, kalor...",
        options: ["Diserap", "Dilepaskan", "Tetap", "Hilang"],
        correct: 1
    },
    {
        question: "Suhu suatu ruangan 25°C. Jika dinyatakan dalam skala Fahrenheit, maka suhu tersebut adalah...",
        options: ["45°F", "57°F", "77°F", "97°F", "117°F"],
        correct: 2 // 77°F
    },
    {
        question: "Termometer X menunjukkan angka -20 pada titik beku air dan 130 pada titik didih air. Jika suhu suatu benda diukur dengan termometer Celcius menunjukkan 50°C, maka pada termometer X akan menunjukkan...",
        options: ["25°X", "55°X", "75°X", "95°X", "105°X"],
        correct: 1 // 55°X
    },
    {
        question: "Perbandingan skala suhu Celcius, Reamur, Fahrenheit, dan Kelvin adalah...",
        options: ["5 : 4 : 9 : 5", "4 : 5 : 9 : 5", "9 : 5 : 4 : 5", "5 : 9 : 4 : 5", "4 : 9 : 5 : 5"],
        correct: 0 // 5 : 4 : 9 : 5
    },
    {
        question: "Kalor yang dibutuhkan untuk mengubah 200 gram es bersuhu -10°C menjadi air bersuhu 0°C adalah... (kalor jenis es = 0,5 kal/g°C, kalor lebur es = 80 kal/g)",
        options: ["16.000 kal", "17.000 kal", "18.000 kal", "19.000 kal", "20.000 kal"],
        correct: 1 // 17.000 kal
    },
    {
        question: "Air bermassa 100 gram bersuhu 20°C dicampur dengan 50 gram air bersuhu 80°C. Jika kalor jenis air 1 kal/g°C dan tidak ada kalor yang terbuang, maka suhu akhir campuran adalah...",
        options: ["30°C", "35°C", "40°C", "45°C", "50°C"],
        correct: 2 // 40°C
    },
    {
        question: "Sebuah batang logam panjangnya 100 cm pada suhu 20°C. Jika koefisien muai panjang logam 0,000012/°C dan batang dipanaskan hingga 120°C, maka pertambahan panjang batang adalah...",
        options: ["0,10 cm", "0,12 cm", "0,15 cm", "0,18 cm", "0,20 cm"],
        correct: 1 // 0,12 cm
    },
    {
        question: "Hubungan antara koefisien muai panjang (α), koefisien muai luas (β), dan koefisien muai volume (γ) adalah...",
        options: ["α = β = γ", "β = 2α dan γ = 3α", "β = 3α dan γ = 2α", "α = 2β = 3γ", "α = β = 2γ"],
        correct: 1 // β = 2α dan γ = 3α
    },
    {
        question: "Perpindahan kalor yang terjadi pada pemanasan air dalam panci adalah...",
        options: ["konduksi saja", "konveksi saja", "radiasi saja", "konduksi dan konveksi", "konveksi dan radiasi"],
        correct: 3 // konduksi dan konveksi
    },
    {
        question: "Perpindahan kalor yang tidak memerlukan medium (zat perantara) adalah...",
        options: ["konduksi", "konveksi", "radiasi", "adveksi", "sublimasi"],
        correct: 2 // radiasi
    },
    {
        question: "Menurut Hukum Stefan-Boltzmann, laju kalor radiasi sebanding dengan...",
        options: ["suhu (T)", "kuadrat suhu (T²)", "pangkat tiga suhu (T³)", "pangkat empat suhu (T⁴)", "akar kuadrat suhu (√T)"],
        correct: 3 // pangkat empat suhu (T⁴)
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
