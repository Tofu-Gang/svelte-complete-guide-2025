<script>
	import HelloWorld from "$lib/components/HelloWorld.svelte";
	import DisplayName from '$lib/components/DisplayName.svelte';
	import RandomNumber from '$lib/components/RandomNumber.svelte';
	import Counter from '$lib/components/Counter.svelte';
	import CounterNoEffects from '$lib/components/CounterNoEffects.svelte';
</script>

<hr>
<p>9. Svelte Component Basics</p>
<hr>
<!--styles from HelloWorld component does not apply to this h1 tag-->
<h1>Outer</h1>
<HelloWorld />
<hr>
<p>10. Adding Reactivity to Our Component</p>
<hr>
<p>11. A Deep Dive into Signal Based Reactivity</p>
<hr>
<p>12. A Deep Dive into Signal Based Reactivity (cont.)</p>
<hr>
<p>13. More on Derived State</p>
<hr>
<DisplayName />
<hr>
<p>14. Don't use Effects to Derive Values</p>
<hr>
<p>15. You Might Not Need to Use Effects</p>
<hr>
<p>16. $effect.pre & Lifecycle Functions</p>
<hr>
<RandomNumber />
<hr>
<p>17. Using Effects to Create a Counter Component</p>
<hr>
<Counter />
<hr>
<p>18. Counter Component Without Using Effects</p>
<CounterNoEffects />
