"use client";

import { RotateCcw } from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ResetComments } from "@/lib/types";

const CONFIRM_WORD = "RESET";

export function ResetDialog({ onConfirm }: { onConfirm: ResetComments }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [resetting, setResetting] = useState(false);
  const confirmed = value.trim().toUpperCase() === CONFIRM_WORD;

  function handleOpenChange(next: boolean) {
    if (!next) setValue("");
    setOpen(next);
  }

  async function handleReset() {
    if (!confirmed || resetting) return;
    setResetting(true);
    try {
      await onConfirm();
      handleOpenChange(false);
    } finally {
      setResetting(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger
        render={
          <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-muted-foreground" />
        }
      >
        <RotateCcw className="size-3.5" />
        Reset
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset all comments?</AlertDialogTitle>
          <AlertDialogDescription>
            This deletes every comment and restores the original seed data — any
            comments you added or edited will be lost. Type{" "}
            <span className="font-mono text-foreground">{CONFIRM_WORD}</span> to
            confirm.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={CONFIRM_WORD}
          autoFocus
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleReset}
            disabled={!confirmed || resetting}
          >
            {resetting ? "Resetting…" : "Reset"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
