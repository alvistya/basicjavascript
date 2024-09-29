class Applicant {
  constructor(name, age, cash) {
      this.name = name;
      this.age = age;
      this.cash = cash;
  }
}

let applicantList = [];

document.getElementById('formRegister').addEventListener('submit', function (e) {
  e.preventDefault();
  
  let name = document.getElementById('name').value.trim();
  let age = parseInt(document.getElementById('age').value);
  let cash = parseInt(document.getElementById('cash').value.replace(/\./g, '')); // Menghapus titik jika ada

  // Validasi
  if (name.length >= 10 && age >= 25 && cash >= 100000 && cash <= 1000000) {
      let applicant = new Applicant(name, age, cash);
      applicantList.push(applicant);
      displayApplicants();
      displayResume();
      document.getElementById('formRegister').reset();
      
      // Berpindah ke tab List setelah submit
      $('.nav-tabs a[href="#list-tab"]').tab('show');
  } else {
      let errorMessage = '';
      if (name.length < 10) {
          errorMessage += 'Name must be at least 10 characters long.\n';
      }
      if (age < 25) {
          errorMessage += 'Age must be at least 25 years.\n';
      }
      if (cash < 100000 || cash > 1000000) {
          errorMessage += 'Cash must be between 100,000 and 1,000,000.\n';
      }
      alert('Invalid input:\n' + errorMessage);
  }
});

function displayApplicants() {
  let tbody = document.querySelector('#applicantTable tbody');
  tbody.innerHTML = ''; // Hapus daftar sebelumnya

  if (applicantList.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3" class="text-center">No applicants registered yet.</td></tr>';
  } else {
      applicantList.forEach((applicant) => {
          let row = `<tr>
              <td>${applicant.name}</td>
              <td>${applicant.age}</td>
              <td>${applicant.cash.toLocaleString('en-US')}</td> <!-- Format cash dengan pemisah ribuan -->
          </tr>`;
          tbody.innerHTML += row;
      });
  }
}

function displayResume() {
  if (applicantList.length === 0) {
      document.getElementById('resume').innerHTML = ''; // Hapus resume jika tidak ada pendaftar
      return;
  }

  let totalCash = applicantList.reduce((total, applicant) => total + applicant.cash, 0);
  let totalAge = applicantList.reduce((total, applicant) => total + applicant.age, 0);
  let avgCash = totalCash / applicantList.length;
  let avgAge = totalAge / applicantList.length;

  document.getElementById('resume').innerHTML = `
      <p>Average cash: ${avgCash.toLocaleString('en-US')}</p>
      <p>Average age: ${avgAge.toFixed(2)}</p>
  `;
}
