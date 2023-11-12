const res = await fetch('http://localhost:5000/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'w',
    password: 'w',
  }),
});

if (res.ok) {
  console.log(await res.json());
} else {
  console.log(res.statusText, res.status);
}
