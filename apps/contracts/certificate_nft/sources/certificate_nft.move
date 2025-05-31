module certificate_nft::certificate_nft {

    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;

    /// Stores admin address that is authorized to mint certificates
    public struct Config has key, store {
        id: UID,
        admin: address,
    }

    /// NFT certificate structure
    public struct Certificate has key, store {
        id: UID,
        level: u64,
        course_name: vector<u8>,
        issued_at: u64,
    }

    /// Event emitted when certificate is issued
    public struct CertificateIssuedEvent has copy, drop, store {
        recipient: address,
        level: u64,
        course_name: vector<u8>,
        issued_at: u64,
    }

    /// Internal initializer function to create the Config object (admin)
    fun init(ctx: &mut tx_context::TxContext) {
        let config = Config {
            id: object::new(ctx),
            admin: tx_context::sender(ctx),
        };

        // Share object so others can use it
        transfer::public_share_object(config);
    }

    /// Public entry point to mint a certificate, only allowed by admin
    public entry fun mint_certificate(
        config: &Config,
        recipient: address,
        level: u64,
        course_name: vector<u8>,
        issued_at: u64,
        ctx: &mut TxContext
    ) {
        // Ensure only admin can mint
        let sender = tx_context::sender(ctx);
        assert!(sender == config.admin, 100);

        // Create certificate NFT
        let cert = Certificate {
            id: object::new(ctx),
            level,
            course_name: copy course_name,
            issued_at,
        };

        // Emit event for tracking
        event::emit(CertificateIssuedEvent {
            recipient,
            level,
            course_name,
            issued_at,
        });

        // Transfer to recipient
        transfer::transfer(cert, recipient);
    }

    /// View function to retrieve certificate info
    public fun get_certificate_info(cert: &Certificate): (
        u64, vector<u8>, u64
    ) {
        (
            cert.level,
            cert.course_name,
            cert.issued_at
        )
    }
}