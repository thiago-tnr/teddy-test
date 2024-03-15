BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [user_id] NVARCHAR(255) NOT NULL,
    [name] NVARCHAR(255) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([user_id]),
    CONSTRAINT [User_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Car] (
    [car_id] NVARCHAR(255) NOT NULL,
    [plate] NVARCHAR(8) NOT NULL,
    [color] NVARCHAR(255) NOT NULL,
    [brand] NVARCHAR(255) NOT NULL,
    CONSTRAINT [Car_pkey] PRIMARY KEY CLUSTERED ([car_id]),
    CONSTRAINT [Car_plate_key] UNIQUE NONCLUSTERED ([plate])
);

-- CreateTable
CREATE TABLE [dbo].[CarUsage] (
    [car_usage_id] NVARCHAR(255) NOT NULL,
    [startDate] DATETIME NOT NULL,
    [endDate] DATETIME,
    [driver] NVARCHAR(255) NOT NULL,
    [car] NVARCHAR(8) NOT NULL,
    [reason] NVARCHAR(255) NOT NULL,
    CONSTRAINT [CarUsage_pkey] PRIMARY KEY CLUSTERED ([car_usage_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[CarUsage] ADD CONSTRAINT [CarUsage_driver_fkey] FOREIGN KEY ([driver]) REFERENCES [dbo].[User]([name]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CarUsage] ADD CONSTRAINT [CarUsage_car_fkey] FOREIGN KEY ([car]) REFERENCES [dbo].[Car]([plate]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
