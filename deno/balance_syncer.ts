/**
 * Script to sync the balance of the addresses in the ../hodlers.csv
 * 
 * Purpose:
 * 1. Read the ../hodlers.csv file.
 * 2. For each address, fetch its current ETH balance
 * 3. Output the results to a new CSV file
 **/
import { parse } from 'csv-parse';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { network_map, ethGetBalances } from './utils/ethereum.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const inputFile = path.resolve(__dirname, '../holders.csv');
    const outputFile = path.resolve(__dirname, '../holders_with_balances.csv');
    const outputStream = createWriteStream(outputFile);

    // Write CSV header
    outputStream.write('address,balance\n');
    const network = await network_map();
    console.log("network:", network);
    try {
        const parser = createReadStream(inputFile).pipe(
            parse({
                columns: true,
                skip_empty_lines: true
            })
        );

        for await (const record of parser) {
            console.log(record.address);
            const address = record.address;
            const balance = await ethGetBalances(network, address);
            outputStream.write(`${address},${balance.balances[network.tokensAddresses[0]]}\n`);
            console.log(`Processed ${address} - Balance: ${balance.balances[network.tokensAddresses[0]]} RMUD`);
        }

        console.log('Balance sync completed! Results written to hodlers_with_balances.csv');
    } catch (error) {
        console.error('Error processing addresses:', error);
        throw error;
    } finally {
        outputStream.end();
    }
}

// Execute the script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });