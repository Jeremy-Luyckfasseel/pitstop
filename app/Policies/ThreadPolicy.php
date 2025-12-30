<?php

namespace App\Policies;

use App\Models\Thread;
use App\Models\User;

class ThreadPolicy
{
    /**
     * Determine whether the user can update the thread.
     * Only the author or an admin can update.
     */
    public function update(User $user, Thread $thread): bool
    {
        return $user->is_admin || $user->id === $thread->user_id;
    }

    /**
     * Determine whether the user can delete the thread.
     * Only the author or an admin can delete.
     */
    public function delete(User $user, Thread $thread): bool
    {
        return $user->is_admin || $user->id === $thread->user_id;
    }

    /**
     * Determine whether the user can pin/unpin the thread.
     * Only admins can pin threads.
     */
    public function pin(User $user, Thread $thread): bool
    {
        return $user->is_admin;
    }
}
