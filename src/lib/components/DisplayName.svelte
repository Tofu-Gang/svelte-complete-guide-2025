<!--what is between <script> tags runs only once-->
<script lang="ts">
	let userName = $state("");
	let firstName = $state("Jakub");
	let lastName = $state("Franěk");
	// $derived for expression, $derived.by for function
	// let fullNameExpression = $derived(`${firstName} ${lastName}`);
	let fullName = $derived.by(() => {
		// fullName used only by the button if userName exists
		// does not run unless userName does not exist or button is pressed
		// runs synchronously
		// fullName is read only, cannot be written into
		// pure function only
		console.log("fullName derived");
		return `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;
	});

	$effect(() => {
		if(userName || fullName) {
			console.log("User has a username or a full name.");
		}
	})
</script>

<!-- update userName|firstName|lastName value every time it changes in the input field -->
<!-- since they are defined as a $state, DOM is refreshed with every change -->
<p><b>userName: </b><input bind:value={userName} /></p>
<p><b>firstName: </b><input value={firstName} oninput={(event) => {
	// equivalent to binding the value (bind:)
  firstName = event.currentTarget.value;
	console.log(fullName);
}} /></p>
<p><b>lastName: </b><input bind:value={lastName} /></p>
<!-- display userName if it exists, display fullName otherwise -->
<h1>{userName || fullName}</h1>
<button onclick={() => {
	console.log(fullName);
}}>Get Full Name</button>

<style>
    h1 {
        color: red;
    }
</style>
