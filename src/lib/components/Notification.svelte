<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	let { notification, onremove }: {
		notification: {
			index: number;
			id: string;
			title: string;
			body: string;
			date: number;
		}
		onremove?: (id: string) => void
	} = $props();
	const { index, id, title, body, date } = notification;
	const dateObject = new Date(date);
</script>

<div class="notification">
	<h5>{index} - {title}</h5>
	<time datetime={dateObject.toISOString()}>{dateObject.toLocaleString()}</time>
	<p>{body}</p>
	<div class="actions">
		<Button --buttonBgColor="rgb(218, 84, 84)" onclick={() => {
			onremove?.(id);
		}}>Remove</Button>
	</div>
</div>

<style lang="scss">
  .notification {
    border: 1px solid #3a3a3a;
    background-color: #1e1e1efa;
    padding: 15px;
    border-radius: 5px;
    font-family: Arial, Helvetica, sans-serif;
    .actions {
      display: flex;
      justify-content: flex-end;
    }
    h5 {
      margin: 0 0 10px;
      font-size: 20px;
    }
    p {
      margin: 0 0 10px;
    }
  }
</style>
