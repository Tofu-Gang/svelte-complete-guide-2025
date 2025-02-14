<script lang="ts">
	import generateNotifications from '$lib/utils/generate-notifications';
	import Notification from '$lib/components/Notification.svelte';

	const notifications = $state(generateNotifications());
</script>

<ul>
<!-- loop through all notifications -->
	{#each notifications as notification, index}
		<!-- constants can be defined in markup -->
		<!--{@const test = "test constant"}-->
		<li>
			<Notification notification={{index, ...notification}} onremove={(id) => {
				notifications.splice(index, 1);
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