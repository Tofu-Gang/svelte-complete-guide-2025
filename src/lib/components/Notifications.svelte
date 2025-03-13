<script lang="ts">
	import generateNotifications from '$lib/utils/generate-notifications';
	import Notification from '$lib/components/Notification.svelte';
	import Button from '$lib/components/Button.svelte';

	// $state.raw means that this state will NOT be proxyfied, therefore we cannot mutate the array;
	// we have to assign a new value instead; remove button will not work now
	let notifications = $state.raw(generateNotifications());
</script>

<Button onclick={() => {
	notifications = generateNotifications();
}}>Refresh</Button>
<ul>
	<!-- loop through all notifications -->
  <!-- identify each notification by its id (parenthesis at the end) so the correct notification is removed -->
	{#each notifications as notification (notification.id)}
		<!-- constants can be defined in markup -->
		<!--{@const test = "test constant"}-->
		<li>
			<Notification {notification} onremove={(id) => {
				notifications = notifications.filter((notification) => notification.id !== id);
			}} />
		</li>
	{:else}
		<!-- if notifications are an empty array -->
		<p>No notifications</p>
	{/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 10px;
        margin: 0;
        li {
            margin-bottom: 10px;
        }
    }
</style>