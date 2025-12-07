Alamitra Hybrid Backend (Firebase Functions + Express)

How to run (local dev):
1. cd functions && npm install
2. firebase login && firebase use --add
3. set config: firebase functions:config:set openai.key="sk_xxx" razorpay.key_id="rzp_test_xxx" razorpay.key_secret="secret"
4. firebase emulators:start --only functions,firestore
5. health: http://localhost:5001/<project>/us-central1/api/health

Notes:
- Do NOT commit service account JSON or env keys.
- For production verify webhooks & enforce stricter validation.
Root firebase.json (place in repo root alamitra-hybrid-backend/firebase.json)
