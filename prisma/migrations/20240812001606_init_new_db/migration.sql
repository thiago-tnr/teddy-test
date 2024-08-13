BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [user_id] NVARCHAR(255) NOT NULL,
    [name] NVARCHAR(255) NOT NULL,
    [email] NVARCHAR(255) NOT NULL,
    [password] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME NOT NULL,
    [updated_at] DATETIME NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([user_id]),
    CONSTRAINT [User_name_key] UNIQUE NONCLUSTERED ([name]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [User_password_key] UNIQUE NONCLUSTERED ([password])
);

-- CreateTable
CREATE TABLE [dbo].[ShortUrl] (
    [url_id] NVARCHAR(255) NOT NULL,
    [original_url] NVARCHAR(255) NOT NULL,
    [short_url] NVARCHAR(255) NOT NULL,
    [clicks] INT NOT NULL,
    [user_id] NVARCHAR(255) NOT NULL,
    [created_at] DATETIME NOT NULL,
    [updated_at] DATETIME NOT NULL,
    [deleted_at] DATETIME,
    CONSTRAINT [ShortUrl_pkey] PRIMARY KEY CLUSTERED ([url_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[ShortUrl] ADD CONSTRAINT [ShortUrl_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
