<script>
        import Sketchpad from './Sketchpad.svelte';
</script>

    <svelte:head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do" rel="stylesheet">
            <style>
                svg text {
                    font-family: Nothing You Could Do;
                    font-display: block;
                }
            </style>
    </svelte:head>
    

<main>
    <h1>Rough Sketch</h1>

    <Sketchpad diagram={{
                   height: 400,
                   width: 800,
                   objects: [
                       {
                           type: 'rectangle',
                           box: [10, 10, 300, 150]
                       },
                       {
                           type: 'circle',
                           box: [50, 50, 200, 200]
                       },
                       {
                           type: 'circle',
                           box: [70, 70, 200, 200]
                       },
                       {
                           type: 'text',
                           box: [10, 10, 300, 150],
                           text: 'First Box'
                       }
                   ]
               }} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

