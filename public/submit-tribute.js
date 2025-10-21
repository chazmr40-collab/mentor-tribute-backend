// submit-tribute.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tributeForm');
  const status = document.getElementById('status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      mentee: document.getElementById('mentee').value.trim(),
      mentor: document.getElementById('mentor').value.trim(),
      location: document.getElementById('location').value.trim(),
      message: document.getElementById('message').value.trim()
    };
    if (!payload.mentee || !payload.mentor || !payload.message) {
      status.textContent = 'Complete mentee, mentor, and message.';
      return;
    }
    status.textContent = 'Submitting...';
    try {
      const res = await fetch('/api/tributes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        status.textContent = 'Server rejected submission.';
        console.error('Server response', res.status, await res.text());
        return;
      }
      status.textContent = 'Tribute submitted successfully.';
      form.reset();
    } catch (err) {
      console.error(err);
      status.textContent = 'Network error. Is the server running?';
    }
  });
});
