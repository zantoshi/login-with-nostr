"use client";
import { useState } from "react";
import Link from "next/link";
import ButtonLoading from "@/components/ButtonLoading"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NostrLoginButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginClick = () => {
        setIsLoading(true);

        // Simulate an API call or loading process here
        setTimeout(() => {
        setIsLoading(false);
        }, 2000); // Change the delay as needed

        // You can also trigger your actual login logic here
        // For now, we're just simulating a loading state
    };
  return (
    <div>
        {isLoading ? (
              <ButtonLoading />
            ) : (
            <Button onClick={handleLoginClick} asChild>
              <Link href={"/login"}>
                <Mail className="mr-2 h-4 w-4" /> Login with Nostr
              </Link>
            </Button>
        )}
    </div>
  )
}