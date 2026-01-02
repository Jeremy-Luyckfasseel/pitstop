<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Reply;
use App\Models\User;

class ReplyPolicy
{
    /**
     * Determine whether the user can update the reply.
     * Only the author or an admin can update.
     */
    public function update(User $user, Reply $reply): bool
    {
        return $user->is_admin || $user->id === $reply->user_id;
    }

    /**
     * Determine whether the user can delete the reply.
     * Only the author or an admin can delete.
     */
    public function delete(User $user, Reply $reply): bool
    {
        return $user->is_admin || $user->id === $reply->user_id;
    }
}
