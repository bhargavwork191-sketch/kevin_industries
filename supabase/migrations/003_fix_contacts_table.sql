-- Fix contacts table structure
-- First, let's check if the table exists and what columns it has
DO $$
BEGIN
    -- Check if contacts table exists
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'contacts') THEN
        -- Add missing columns if they don't exist
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contacts' AND column_name = 'status') THEN
            ALTER TABLE contacts ADD COLUMN status TEXT DEFAULT 'new';
            ALTER TABLE contacts ADD CONSTRAINT contacts_status_check CHECK (status IN ('new', 'read', 'replied', 'archived'));
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contacts' AND column_name = 'ip_address') THEN
            ALTER TABLE contacts ADD COLUMN ip_address INET;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contacts' AND column_name = 'user_agent') THEN
            ALTER TABLE contacts ADD COLUMN user_agent TEXT;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contacts' AND column_name = 'created_at') THEN
            ALTER TABLE contacts ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contacts' AND column_name = 'updated_at') THEN
            ALTER TABLE contacts ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        END IF;
        
        -- Create indexes if they don't exist
        CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
        CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
        
        -- Create updated_at trigger if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_contacts_updated_at') THEN
            CREATE TRIGGER update_contacts_updated_at 
                BEFORE UPDATE ON contacts 
                FOR EACH ROW 
                EXECUTE FUNCTION update_updated_at_column();
        END IF;
        
        RAISE NOTICE 'Contacts table structure updated successfully';
    ELSE
        -- Create the table if it doesn't exist
        CREATE TABLE contacts (
            id BIGSERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            message TEXT NOT NULL,
            status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
            ip_address INET,
            user_agent TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
        CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
        
        -- Create updated_at trigger
        CREATE TRIGGER update_contacts_updated_at 
            BEFORE UPDATE ON contacts 
            FOR EACH ROW 
            EXECUTE FUNCTION update_updated_at_column();
            
        RAISE NOTICE 'Contacts table created successfully';
    END IF;
END $$;
