
<script>

    export let x
    export let y
    export let cancel
    export let makeRectangle
    export let makeCircle
    
</script>

<div class="menu" style:--position-x={x} style:--position-y={y}>
    <div class="option" on:click={makeRectangle}>Rectangle</div>
    <div class="option" on:click={makeCircle}>Circle</div>
    <div class="option" on:click={cancel}>Cancel</div>
</div>

<style>
    div.menu {
        position: fixed;
        left: calc(var(--position-x) * 1px);
        top: calc(var(--position-y) * 1px);
        z-index: 100;
        background-color: white;
        border: 1px solid black;
    }

    div.option {
        padding: 4px;
        cursor: pointer;
    }

    div.option:hover {
        background-color: black;
        color: white;
    }

    div.option:not(:first-child) {
        border-top: 1px solid black;
    }        
</style>
