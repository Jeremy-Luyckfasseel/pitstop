<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReplyRequest;
use App\Http\Requests\UpdateReplyRequest;
use App\Models\Reply;
use App\Models\Thread;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;

class ReplyController extends Controller
{
    use AuthorizesRequests;

    /**
     * Store a newly created reply in storage.
     */
    public function store(StoreReplyRequest $request, Thread $thread): RedirectResponse
    {
        $thread->replies()->create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        return back()->with('success', 'Reply posted successfully.');
    }

    /**
     * Update the specified reply in storage.
     */
    public function update(UpdateReplyRequest $request, Reply $reply): RedirectResponse
    {
        $this->authorize('update', $reply);

        $reply->update($request->validated());

        return back()->with('success', 'Reply updated successfully.');
    }

    /**
     * Remove the specified reply from storage.
     */
    public function destroy(Reply $reply): RedirectResponse
    {
        $this->authorize('delete', $reply);

        $reply->delete();

        return back()->with('success', 'Reply deleted successfully.');
    }
}
