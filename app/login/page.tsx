"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateEvent, verifySignature } from 'nostr-tools';

export default function Login() {
  const router = useRouter();
  const [ok, setOk] = useState(false);
  const [veryOk, setVeryOk] = useState(false);
  const currentTimestamp: number = Math.floor(Date.now() / 1000);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await fetch('/api/challenge');
        const challenge = await response.text();
        return challenge;
      } catch (error) {
        console.error('Error fetching challenge:', error);
        return null;
      }
    };

    if (typeof window !== 'undefined') {
      if (!window.nostr) {
        console.error('nostr extension not found');
        return;
      }

      const fetchDataAndSign = async () => {
        try {
          const challenge = await fetchChallenge();

          if (challenge === null) {
            console.error('Challenge is null. Aborting.');
            return;
          }

          const authEvent = {
            kind: 22242,
            created_at: currentTimestamp,
            tags: [
              ['challenge', challenge]
            ],
            content: 'NBD Nostr Authentication'
          };

          const signedEvent = await window.nostr.signEvent(authEvent);
          console.log(signedEvent);
          setOk(validateEvent(signedEvent));
          setVeryOk(verifySignature(signedEvent));
        } catch (error) {
          console.error('Error signing event:', error);
        }
      };

      fetchDataAndSign();
    }
  }, []);

  useEffect(() => {
    if (ok && veryOk) {
      console.log('successful.');
      router.push('/loggedIn');
    }
  }, [ok, veryOk]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Login.
    </main>
  );
}
