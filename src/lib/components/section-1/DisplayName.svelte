<script lang="ts">
	let firstName = $state("Jakub");
	let lastName = $state("Franěk");
	let fullName = $derived.by(() => {
		return `${firstName} ${lastName}`;
	});
	let userName = $state("jfranek");
	let src = "https://picsum.photos/250/300";
	let bio = "Hello, <b>this</b> is me.";

	$effect(() => {
		if(userName || fullName) {
			console.log("User has a user name or a full name.");
		}
	});
</script>

<ul>
	<li>
		<label for="userName">User Name</label>
		<input bind:value={userName} name="userName" />
	</li>

	<li>
		<label for="firstName">First Name</label>
		<input bind:value={firstName} name="firstName" />
	</li>

	<li>
		<label for="lastName">Last Name</label>
		<input bind:value={lastName} name="lastName" />
	</li>
</ul>

<img {src} alt="A photo of {fullName}">
<h1>{userName || fullName}</h1>
<p>{@html bio}</p>

<style>
	h1 {
			color: red;
	}
</style>