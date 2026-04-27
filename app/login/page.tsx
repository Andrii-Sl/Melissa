const send = async () => {
  const res = await fetch("/api/auth/send", {
    method: "POST",
    body: JSON.stringify({ phone })
  });

  const data = await res.json();

  // 🔑 если мастер-вход
  if (data.master) {
    const res2 = await fetch("/api/auth/verify", {
      method: "POST",
      body: JSON.stringify({ phone })
    });

    const d = await res2.json();

    document.cookie = `token=${d.token}; path=/`;
    localStorage.setItem("token", d.token);

    router.push("/dashboard");
    return;
  }

  alert("Код отправлен (смотри console)");
  setStep(2);
};
