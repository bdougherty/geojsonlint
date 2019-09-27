import test from 'ava';
import execa from 'execa';

test('properly matches files', async (t) => {
	const { stdout } = await execa('./cli.js', ['samples/*.geojson']);
	t.true(stdout.includes('samples/invalid-type.geojson'));
	t.true(stdout.includes('samples/precision.geojson'));
});
