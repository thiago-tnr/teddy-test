BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [user_id] NVARCHAR(255) NOT NULL,
    [name] NVARCHAR(255) NOT NULL,
    [email] NVARCHAR(255) NOT NULL,
    [senha] NVARCHAR(255) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([user_id])
);

-- CreateTable
CREATE TABLE [dbo].[Expense] (
    [expense_id] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(255),
    [data] DATETIME2 NOT NULL,
    [value] INT NOT NULL CONSTRAINT [Expense_value_df] DEFAULT 0,
    [user_owner] NVARCHAR(255) NOT NULL,
    CONSTRAINT [Expense_pkey] PRIMARY KEY CLUSTERED ([expense_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Expense] ADD CONSTRAINT [Expense_user_owner_fkey] FOREIGN KEY ([user_owner]) REFERENCES [dbo].[User]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
