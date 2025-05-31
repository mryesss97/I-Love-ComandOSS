import 'dotenv/config';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import * as fs from 'fs';
import * as path from 'path';
import { decodeSuiPrivateKey } from '@mysten/sui/cryptography';

// Load private key from .env
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
if (!PRIVATE_KEY) throw new Error('Missing PRIVATE_KEY in .env');
const client = new SuiClient({ url: getFullnodeUrl('devnet') });
const parseKey = decodeSuiPrivateKey(PRIVATE_KEY);
const keypair = Ed25519Keypair.fromSecretKey(parseKey.secretKey);

console.log('Wallet address:', keypair.toSuiAddress());
async function deploy() {
  const outputPath = path.join(
    __dirname,
    '../build/certificate_nft_output.json'
  );
  const buildData = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  const { modules, dependencies } = buildData;

  const tx = new Transaction();
  tx.setSender(keypair.toSuiAddress());
  tx.setGasBudget(1000000000);
  tx.publish({ modules, dependencies });

  const result = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: {
      showInput: true,
      showEffects: true,
      showEvents: true,
    },
  });

  const created = result.effects?.created?.find(
    (obj: any) => obj.owner === 'Immutable'
  );
  console.log('result:', result);
  const packageId = created?.reference?.objectId;

  const output = {
    packageId,
    module: 'certificate_nft',
    network: 'devnet',
    deployedAt: new Date().toISOString(),
  };
  const savePath = path.join(__dirname, '../build/deployment.json');
  fs.writeFileSync(savePath, JSON.stringify(output, null, 2));
  console.log('✅ Deploy successful!');
  console.log('created object:', created);
  console.log('📦 Package ID:', created?.reference?.objectId);
}

deploy().catch((err) => {
  console.error('❌ Deployment failed:', err);
});
