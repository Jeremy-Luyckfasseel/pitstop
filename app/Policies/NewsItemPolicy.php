<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\NewsItem;
use App\Models\User;

class NewsItemPolicy
{
    /**
     * Determine whether the user can update the model.
     * Only the author or an admin can update.
     */
    public function update(User $user, NewsItem $newsItem): bool
    {
        return $user->is_admin || $user->id === $newsItem->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     * Only the author or an admin can delete.
     */
    public function delete(User $user, NewsItem $newsItem): bool
    {
        return $user->is_admin || $user->id === $newsItem->user_id;
    }
}
