<script lang="ts">
	const target = {
		firstName: "Jakub",
		lastName: "Franěk",
		occupations: [],

		get fullName() {
			return `${this.firstName} ${this.lastName}`;
		},
		set occupation(value: string) {
			this.occupations.push(value);
		}
	}

	const handler = {
		get(target, prop) {
			return prop in target ? target[prop] : "NA";
		},
		set(target, prop, value) {
			// allows any changes only after some validations
			if (["firstName", "lastName"].includes(prop)) {
				if (typeof value !== "string") {
					throw new TypeError(`Property ${prop} must be a string.`);
				} else {
					target[prop] = value;
				}
			} else if (prop === "occupation") {
				if (typeof value !== "string") {
					throw new TypeError(`Property ${prop} must be a string.`);
				} else {
					target.occupations.push(value);
				}
			}
			return true;
		}
	};
	const proxy = new Proxy(target, handler);
	// prints first name, Jakub
	console.log(proxy.firstName);
	// prints NA since the prop does not exist in the target object
	console.log(proxy.nonExistingProp);
	proxy.firstName = "Ruprecht";
	// does nothing
	proxy.nonExistingProp = "I do not exist!";
	// pushes the string to the occupations array
	proxy.occupation = "Web Developer";
	// throws an exception
	// proxy.firstName = 232;
	console.log(target);
</script>