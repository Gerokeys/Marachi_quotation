document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("#quotationTable tbody");
  const grandTotalEl = document.getElementById("grandTotal");
  const subtotalEl = document.getElementById("subtotal");

  let subtotal = 0;
  let grandTotal = 0;
  let itemCount = 0;

  window.addItem = function () {
    const description = document.getElementById("description").value;
    const measurements = document.getElementById("measurements").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const unitPrice = parseFloat(document.getElementById("unitPrice").value);

    if (description && measurements && quantity > 0 && unitPrice > 0) {
      const total = quantity * unitPrice;
      subtotal += total; // Add to subtotal

      itemCount++;

      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${itemCount}</td>
                <td>${description}</td>
                <td>${""}</td>
                <td>${""}</td>
                <td>${""}</td>
                <td>${total.toLocaleString()}</td>
            `;

      tableBody.appendChild(row);

      // Update subtotal
      subtotalEl.textContent = subtotal.toLocaleString();

      // Update grand total
      grandTotal = subtotal; // Update grand total (here you can add tax, etc., if needed)
      grandTotalEl.textContent = grandTotal.toLocaleString();

      // Clear input fields
      document.getElementById("description").value = "";
      document.getElementById("measurements").value = "";
      document.getElementById("quantity").value = "";
      document.getElementById("unitPrice").value = "";
    } else {
      alert("Please fill in all fields with valid information.");
    }
  };

  window.downloadQuotation = function () {
    const element = document.getElementById("quotationContent");
    const formSection = document.querySelector(".form");
    const addItemButton = document.querySelector('button[onclick="addItem()"]');

    formSection.style.display = "none";
    addItemButton.style.display = "none";

    html2pdf()
      .from(element)
      .set({
        margin: [10, 10, 10, 10],
        filename: "Quotation_Marachi_Metal_Fabricators.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save()
      .then(() => {
        formSection.style.display = "flex";
        addItemButton.style.display = "block";
      });
  };
});

document.addEventListener("DOMContentLoaded", function () {
  const dateElement = document.getElementById("currentDate");

  // Create a new Date object
  const today = new Date();

  // Format the date as YYYY-MM-DD (or customize it as needed)
  const formattedDate = today.getFullYear() + "-" + 
                        String(today.getMonth() + 1).padStart(2, '0') + "-" + 
                        String(today.getDate()).padStart(2, '0');

  // Display the date in the element
  dateElement.textContent = formattedDate;
});