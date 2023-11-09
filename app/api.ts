const res = await fetch('http://localhost:5000/auth/steam', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});

if (res.ok) {
  console.log(await res.json());
} else {
  console.log(res.statusText, res.status);
}
