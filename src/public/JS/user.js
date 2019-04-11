var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4) {
    console.log('Xong');
    USER = JSON.parse(this.responseText);
  }
};
xhttp.open("GET", "/api/user", true);
xhttp.send();