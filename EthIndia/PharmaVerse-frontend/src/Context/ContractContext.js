import Web3 from "web3";
import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import GetContract from "../Utils/GetContract";
import { ethers } from "ethers";
import { Buffer } from 'buffer';


const web3 = new Web3(window.web3 && window.web3.currentProvider);

export const ContractContext = createContext();

function ContractContextProvider(props) {
    let { account } = useContext(AuthContext);
    const [AdminContract, setAdminContract] = useState("");
    const [InspectorContarct, setInspectorContarct] = useState("");
    const [InventoryContract, setInventoryContract] = useState("");
    const [ManufacturerContract, setManufacturerContact] = useState("");
    const [BatchScheduleContarct, setBatchScheduleContarct] = useState("");
    const [RealTimeMonitoringContarct, setRealTimeMonitoringContarct] =
        useState("");
    const [SupplierContract, setSupplierContract] = useState("");
    const [TransporterContract, setTransporterContract] = useState("");

    const [rawMaterials, setRawMaterials] = useState([]);
    const [packages, setPackages] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [batches, setBatches] = useState([]);
    const [packagereports, setPackageReports] = useState([]); // 1st element of array is the report
    const [batchreports, setBatchReports] = useState([]);
    const [packagedeliverdetails, setpackagedeliverdetails] = useState([]);
    const [batchdeliverdetails, setbatchdeliverdetails] = useState([]);

    const updateContract = (data) => {
        setAdminContract(data.AdminContract.AdminContract);
        setInspectorContarct(data.InspectorContract.InspectorContract);
        setInventoryContract(data.InventoryContract.InventoryContract);
        setManufacturerContact(data.ManufacturerContract.ManufacturerContract);
        setBatchScheduleContarct(
            data.BatchSchedulerContract.BatchSchedulerContract
        );
        setRealTimeMonitoringContarct(
            data.RealTimeMonitoringContract.RealTimeMonitoringContract
        );
        setSupplierContract(data.SupplierContract.SupplierContract);
        setTransporterContract(data.TransporterContract.TransporterContract);
    };

    useEffect(() => {
        // console.log(rawMaterials);
        // console.log(packages);
        // console.log(medicines);
        // console.log(batches);
        // console.log(packagereports);
        console.log("batchreports: ", batchreports);
        // console.log(packagedeliverdetails);
        // console.log(batchdeliverdetails);
    }, [
        rawMaterials,
        packages,
        medicines,
        batches,
        packagereports,
        batchreports,
        packagedeliverdetails,
        batchdeliverdetails,
    ]);

    useEffect(() => {
        Services.get_all_raw_materials();
        Services.get_all_packages();
        Services.get_all_medicines();
        Services.get_all_batches();
        Services.get_package_reports();
        Services.get_batch_reports();
        Services.get_package_delivery_details();
        Services.get_batch_delivery_details();
    }, [
        AdminContract,
        InventoryContract,
        TransporterContract,
        SupplierContract,
        ManufacturerContract,
        InspectorContarct,
        RealTimeMonitoringContarct,
        BatchScheduleContarct,
    ]);


    useEffect(() => {
        getContract();
    }, []);

    const getContract = async () => {
        const contractResult = await GetContract();
        // console.log("contractResult", contractResult.data);
        updateContract(contractResult.data);
    };

    const Services = {
        get_all_raw_materials: async () => {
            try {
                if (!InventoryContract) {
                    console.error("InventoryContract not initialized");
                    return;
                }


                const rawMaterialCount = await InventoryContract.methods
                    .materialCount()
                    .call();
                const rawMaterials = [];

                // Loop through the raw materials and fetch each one
                for (let i = 1; i <= rawMaterialCount; i++) {
                    const rawMaterial = await InventoryContract.methods
                        .rawMaterials(i)
                        .call();
                    rawMaterials.push({
                        materialId: Number(rawMaterial[0]),
                        name: rawMaterial[1],
                        description: rawMaterial[2],
                        ipfs_hash: rawMaterial[3],
                        quantity: Number(rawMaterial[4]),
                    });
                }


                setRawMaterials(rawMaterials);

            } catch (error) {
                console.error("Error fetching raw materials: ", error);
            }
        },

        get_all_packages: async () => {
            try {
                // Ensure that SupplierContract is available
                if (!SupplierContract) {
                    console.error("SupplierContract not initialized");
                    return;
                }

                // Call the contract's view function to get the package count
                const packageCount = await SupplierContract.methods
                    .packageCount()
                    .call();
                const packageList = [];

                // Loop through the packages and fetch each one
                for (let i = 1; i <= packageCount; i++) {
                    const packageInfo = await SupplierContract.methods
                        .getRawMaterialPackage(i)
                        .call();

                    const rawMaterialIds = packageInfo[1];
                    const rawMaterialQuantities = packageInfo[2];

                    const rawMaterials = [];

                    for (let j = 0; j < rawMaterialIds.length; j++) {
                        rawMaterials.push({
                            materialId: Number(rawMaterialIds[j]),
                            quantity: Number(rawMaterialQuantities[j]),
                        });
                    }

                    packageList.push({
                        packageId: Number(packageInfo[0]),
                        rawMaterials: rawMaterials,
                        description: packageInfo[3],
                        manufacturerId: packageInfo[4],
                        transporterId: packageInfo[5],
                        supplierId: packageInfo[6],
                        inspectorId: packageInfo[7],
                        stage: Number(packageInfo[8]),
                    });
                }

                setPackages(packageList);
            } catch (error) {
                console.error("Error fetching packages: ", error);
            }
        },
        get_all_medicines: async () => {
            try {
                // Ensure that ManufacturerContract is available
                if (!ManufacturerContract) {
                    console.error("ManufacturerContract not initialized");
                    return;
                }

                // Call the contract's view function to get the medicine count
                const medicineCount = await ManufacturerContract.methods
                    .medicineCount()
                    .call();
                const medicineList = [];

                // Loop through the medicines and fetch each one
                for (let i = 1; i <= medicineCount; i++) {
                    const medicineInfo = await ManufacturerContract.methods
                        .medicines(i)
                        .call();
                    medicineList.push({
                        medicineId: Number(medicineInfo[0]),
                        name: medicineInfo[1],
                        description: medicineInfo[2],
                        totalQuantity: Number(medicineInfo[3]),
                        ipfs_hash: medicineInfo[4],
                    });
                }

                // Now you have the medicineList array containing all medicines
                setMedicines(medicineList);

            } catch (error) {
                console.error("Error fetching medicines: ", error);
            }
        },
        get_all_batches: async () => {
            try {
                // Ensure that ManufacturerContract is available
                if (!ManufacturerContract) {
                    console.error("ManufacturerContract not initialized");
                    return;
                }

                // Call the contract's view function to get the total batch count
                const batchCount = await ManufacturerContract.methods
                    .batchCount()
                    .call();

                const batchList = [];

                // Loop through the batches and fetch each one
                for (let i = 1; i <= batchCount; i++) {
                    const batchInfo = await ManufacturerContract.methods
                        .getBatches(i)
                        .call();

                    const medicineIds = batchInfo[1];
                    const medicineQuantities = batchInfo[2];

                    const medicines = [];

                    for (let j = 0; j < medicineIds.length; j++) {
                        medicines.push({
                            materialId: Number(medicineIds[j]),
                            quantity: Number(medicineQuantities[j]),
                        });
                    }

                    batchList.push({
                        batchId: Number(batchInfo[0]),
                        medicines: medicines,
                        manufacturerId: batchInfo[3],
                        transporterId: batchInfo[4],
                        wholesalerId: batchInfo[5],
                        manufacturingDate: new Date(Number(batchInfo[6]) * 1000), // Convert timestamp to JavaScript Date
                        stage: Number(batchInfo[7]),
                        score: Number(batchInfo[8]),
                        idealstage1conditions: batchInfo[9].map((value) => Number(value)),
                        idealstage2conditions: batchInfo[10].map((value) => Number(value)),
                        idealpackagingconditions: batchInfo[11].map((value) =>
                            Number(value)
                        ),
                        inspectorId: batchInfo[12],
                        InspectionStage: Number(batchInfo[13]),
                    });
                }

                setBatches(batchList);
            } catch (error) {
                console.error("Error fetching batches: ", error);
            }
        },
        create_raw_material: async (name, description, ipfs_hash, quantity) => {
            try {
                if (!InventoryContract) {
                    console.error("InventoryContract not initialized");
                    return {
                        success: false,
                        message: "InventoryContract not initialized",
                    };
                }

                const response = await InventoryContract.methods
                    .addRawMaterial(name, description, ipfs_hash, quantity)
                    .send({
                        from: account,
                    });

                if (response.status) {
                    console.log("Raw material created successfully");
                    return {
                        success: true,
                        message: "Raw material created successfully",
                    };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error creating raw material: ", error);
                return { success: false, message: error.message };
            }
        },
        create_medicine: async (name, description, ipfs_hash) => {
            try {
                if (!ManufacturerContract) {
                    console.error("ManufacturerContract not initialized");
                    return {
                        success: false,
                        message: "ManufacturerContract not initialized",
                    };
                }

                const response = await ManufacturerContract.methods
                    .createMedicine(name, description, ipfs_hash)
                    .send({
                        from: account,
                    });

                if (response.status) {
                    console.log("Medicine created successfully");
                    return { success: true, message: "Medicine created successfully" };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error creating medicine: ", error);
                return { success: false, message: error.message };
            }
        },

        check_availibity: async (materialId, desiredQuantity) => {
            try {
                if (!InventoryContract) {
                    console.error("InventoryContract not initialized");
                    return {
                        success: false,
                        message: "InventoryContract not initialized",
                    };
                }

                const availability = await InventoryContract.methods.checkAvailability(
                    materialId,
                    desiredQuantity
                );

                if (availability > 0) {
                    console.log(
                        `Raw material with ID ${materialId} is available in the desired quantity: ${availability}`
                    );
                    return {
                        success: true,
                        message: `Raw material available in quantity: ${availability}`,
                    };
                } else {
                    console.log(
                        `Raw material with ID ${materialId} is not available in the desired quantity.`
                    );
                    return {
                        success: false,
                        message: `Raw material not available in the desired quantity.`,
                    };
                }
            } catch (error) {
                console.error("Error checking availability: ", error);
                return { success: false, message: error.message };
            }
        },
        increase_quantity: async (materialId, additionalQuantity) => {
            try {
                if (!InventoryContract) {
                    console.error("InventoryContract not initialized");
                    return {
                        success: false,
                        message: "InventoryContract not initialized",
                    };
                }

                // console.log("materialId: ", materialId);
                // console.log("additionalQuantity: ", additionalQuantity);

                // materialId = ethers.BigNumber.from(materialId);
                // additionalQuantity = ethers.BigNumber.from(additionalQuantity);

                console.log("materialId: ", materialId);
                console.log("additionalQuantity: ", additionalQuantity);

                // const materialId = ethers.parseUnits(materialId.toString(), 18);
                // const additionalQuantity = ethers.parseUnits(additionalQuantity.toString(), 18);

                // const rawData = await InventoryContract.methods
                //     .increaseQuantity(materialId, additionalQuantity).encodeABI();
                // const nonce = await web3.eth.getTransactionCount("0x85B6B5d0838569C23c3418D1dB5989242C911208");

                // console.log("rawData: ", rawData);

                // var gas = web3.eth.estimateGas({
                //     to: "0x99117cE597a85EF7Dbb4943acb9870286f11419c",
                //     data: rawData
                // });

                // var privateKey = Buffer.from('3315ea7d689fec2b2d9ce5b7247629b749f520b205e4071883f0342735b058f1', 'hex');

                // var rawTx = {
                //     nonce: nonce,
                //     to: "0x99117cE597a85EF7Dbb4943acb9870286f11419c",
                //     data: rawData,
                //     gasLimit: 30000000,
                //     gasPrice: await web3.eth.getGasPrice(),
                //     gas: gas,
                //     value: 0
                // }

                // console.log("Tx: ", Tx);

                // var tx = new Tx(rawTx, { 'chain': 'sepolia' });
                // tx.sign(privateKey);

                // var serializedTx = tx.serialize();

                // console.log(serializedTx.toString('hex'));


                // // console.log("Tx: ", tx);

                // web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
                //     .on('receipt', console.log);

                // await web3.eth.accounts.signTransaction(tx, "3315ea7d689fec2b2d9ce5b7247629b749f520b205e4071883f0342735b058f1").then(signed => {
                //     web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
                // });

                    const response = await InventoryContract.methods
                .increaseQuantity(materialId, additionalQuantity)
                        .send({
                            from: account,
                            // gasLimit: 30000000
                        }); 

                if (response.status) {
                    console.log(
                        `Quantity increased successfully for material with ID ${materialId}`
                    );
                    return {
                        success: true,
                        message: `Quantity increased successfully for material with ID ${materialId}`,
                    };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error increasing quantity: ", error);
                return { success: false, message: error.message };
            }
        },
        update_raw_materials: async (
            materialId,
            name,
            description,
            ipfs_hash,
            quantity
        ) => {
            try {
                if (!InventoryContract) {
                    console.error("InventoryContract not initialized");
                    return {
                        success: false,
                        message: "InventoryContract not initialized",
                    };
                }

                const response = await InventoryContract.methods
                    .updateRawMaterial(materialId, name, description, ipfs_hash, quantity)
                    .send({
                        from: account,
                    });

                if (response.status) {
                    console.log(
                        `Raw material with ID ${materialId} updated successfully`
                    );
                    return {
                        success: true,
                        message: `Raw material with ID ${materialId} updated successfully`,
                    };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error updating raw material: ", error);
                return { success: false, message: error.message };
            }
        },
        update_package_state: async (packageId, newStage) => {
            try {
                if (!SupplierContract) {
                    console.error("SupplierContract not initialized");
                    return {
                        success: false,
                        message: "SupplierContract not initialized",
                    };
                }

                const response = await SupplierContract.methods
                    .updatePackageStage(packageId, newStage)
                    .send({
                        from: account,
                    });

                if (response.status) {
                    console.log(
                        `Package with ID ${packageId} stage updated successfully to ${newStage}`
                    );
                    return {
                        success: true,
                        message: `Package stage updated successfully to ${newStage}`,
                    };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error updating package stage: ", error);
                return { success: false, message: error.message };
            }
        },
        update_batch_state: async (batchId, newStage) => {
            try {
                if (!ManufacturerContract) {
                    console.error("ManufacturerContract not initialized");
                    return {
                        success: false,
                        message: "ManufacturerContract not initialized",
                    };
                }

                const response = await ManufacturerContract.methods
                    .updateBatchStage(batchId, newStage)
                    .send({
                        from: account,
                    });

                if (response.status) {
                    console.log(
                        `Batch with ID ${batchId} stage updated successfully to ${newStage}`
                    );
                    return {
                        success: true,
                        message: `Batch stage updated successfully to ${newStage}`,
                    };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error updating batch stage: ", error);
                return { success: false, message: error.message };
            }
        },
        update_batch_inspection_state: async (batchId, newStage) => {
            try {
                if (!ManufacturerContract) {
                    console.error("ManufacturerContract not initialized");
                    return {
                        success: false,
                        message: "ManufacturerContract not initialized",
                    };
                }

                const response = await ManufacturerContract.methods
                    .updateInspectionStage(batchId, newStage)
                    .send({
                        from: account,
                    });

                if (response.status) {
                    console.log(
                        `Batch with ID ${batchId} Inspection stage updated successfully to ${newStage}`
                    );
                    return {
                        success: true,
                        message: `Batch Inspection stage updated successfully to ${newStage}`,
                    };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error updating batch Inspection stage: ", error);
                return { success: false, message: error.message };
            }
        },
        record_package_delivery: async (packageId) => {
            try {
                if (!TransporterContract) {
                    console.error("TransporterContract not initialized");
                    return {
                        success: false,
                        message: "TransporterContract not initialized",
                    };
                }

                const response = await TransporterContract.methods
                    .recordPackageDelivery(packageId)
                    .send({
                        from: account,
                    });

                if (response.status) {
                    console.log(
                        `Package with ID ${packageId} delivery recorded successfully`
                    );
                    return {
                        success: true,
                        message: `Package delivery recorded successfully`,
                    };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error recording package delivery: ", error);
                return { success: false, message: error.message };
            }
        },
        record_batch_delivery: async (batchId) => {
            try {
                if (!TransporterContract) {
                    console.error("TransporterContract not initialized");
                    return {
                        success: false,
                        message: "TransporterContract not initialized",
                    };
                }

                const response = await TransporterContract.methods
                    .recordBatchDelivery(batchId)
                    .send({
                        from: account,
                    });

                if (response.status) {
                    console.log(
                        `Batch with ID ${batchId} delivery recorded successfully`
                    );
                    return {
                        success: true,
                        message: `Batch delivery recorded successfully`,
                    };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error recording batch delivery: ", error);
                return { success: false, message: error.message };
            }
        },
        check_quality_of_package: async (
            packageId,
            description,
            quantityArray,
            concentrationArray
        ) => {
            try {
                if (!InspectorContarct) {
                    console.error("InspectorContract not initialized");
                    return {
                        success: false,
                        message: "InspectorContract not initialized",
                    };
                }

                // const quantity = quantityArray.map((value) => ethers.BigNumber.from(value));
                // const concentration = concentrationArray.map((value) => ethers.BigNumber.from(value));

                const quantity = [1000];
                const concentration = [1000];

                const response = await InspectorContarct.methods
                    .checkquality(packageId, description, quantity, concentration)
                    .send({
                        from: account,
                    });

                if (response.status) {
                    console.log(`Quality checked for package with ID ${packageId}`);
                    return {
                        success: true,
                        message: `Quality checked for package with ID ${packageId}`,
                    };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error checking quality: ", error);
                return { success: false, message: error.message };
            }
        },
        get_package_reports: async () => {
            try {
                if (!InspectorContarct) {
                    console.error("InspectorContract not initialized");
                    return [];
                }

                const packageCount = await SupplierContract.methods
                    .packageCount()
                    .call();

                let formattedPackageReports = [];

                for (let index = 1; index <= packageCount; index++) {
                    const flag = await SupplierContract.methods
                        .rawMaterialPackages(index)
                        .call();

                    if (flag.stage == 3) {
                        let packageReport = await InspectorContarct.methods
                            .packageReports(index, 0)
                            .call();

                        formattedPackageReports.push({
                            packageid: packageReport[0],
                            description: packageReport[1],
                            grade: packageReport[2],
                            timestamp: new Date(Number(packageReport[3]) * 1000),
                            inspectorId: packageReport[4],
                            isApproved: packageReport[5],
                        });
                    }
                }

                setPackageReports(formattedPackageReports);

                return formattedPackageReports;
            } catch (error) {
                console.error("Error fetching package reports: ", error);
                return [];
            }
        },

        get_batch_reports: async () => {
            try {
                if (!RealTimeMonitoringContarct || !ManufacturerContract) {
                    console.error("RealTimeMonitoringContract not initialized");
                    return [];
                }

                const batchCount = await ManufacturerContract.methods
                    .batchCount()
                    .call();

                let formattedBatchReports = [];

                // Loop through each batch
                for (let i = 1; i <= batchCount; i++) {
                    let batchReportsCount = await ManufacturerContract.methods.batches(i).call();

                    batchReportsCount = Number(batchReportsCount[8]) - 1;

                    let formattedReports = [];

                    // Loop through each report of the batch
                    for (let j = 0; j < batchReportsCount; j++) {
                        const report = await RealTimeMonitoringContarct.methods
                            .batchReports(i, j)
                            .call();

                        formattedReports.push({
                            batchId: Number(report[0]),
                            stage: Number(report[1]),
                            batchReportResult: Number(report[2])
                        });
                    }

                    for (let j = 0; j < formattedReports.length; j++) {
                        formattedBatchReports.push(formattedReports[j]);
                    }
                }

                // Set the batchReports state
                setBatchReports(formattedBatchReports);

                return formattedBatchReports;
            } catch (error) {
                console.error("Error fetching batch reports: ", error);
                return [];
            }
        },

        get_package_delivery_details: async () => {
            try {
                if (!TransporterContract) {
                    console.error("TransporterContract not initialized");
                    return null;
                }

                const packageCount = await SupplierContract.methods
                    .packageCount()
                    .call();

                let formattedDeliveryDetails = [];

                for (let index = 1; index <= packageCount; index++) {
                    let flag = await SupplierContract.methods
                        .rawMaterialPackages(index)
                        .call();

                    if (flag.stage == 3) {
                        let deliveryDetails = await TransporterContract.methods
                            .packageDeliveries(index)
                            .call();

                        formattedDeliveryDetails.push({
                            packageId: deliveryDetails[0],
                            supplierId: deliveryDetails[1],
                            transporterId: deliveryDetails[2],
                            deliveryTime: new Date(Number(deliveryDetails[3]) * 1000),
                        });
                    }
                }

                setpackagedeliverdetails(formattedDeliveryDetails);

                return formattedDeliveryDetails;
            } catch (error) {
                console.error("Error fetching package delivery details: ", error);
                return null;
            }
        },

        get_batch_delivery_details: async () => {
            try {
                if (!TransporterContract) {
                    console.error("TransporterContract not initialized");
                    return null;
                }

                const batchCount = await ManufacturerContract.methods
                    .batchCount()
                    .call();

                let formattedDeliveryDetails = [];

                for (let index = 1; index <= batchCount; index++) {
                    let flag = await ManufacturerContract.methods.batches(index).call();

                    if (flag.stage == 4) {
                        let deliveryDetails = await TransporterContract.methods
                            .batchDeliveries(index)
                            .call();

                        formattedDeliveryDetails.push({
                            batchId: deliveryDetails[0],
                            manufacturerId: deliveryDetails[1],
                            transporterId: deliveryDetails[2],
                            deliveryTime: new Date(deliveryDetails[3] * 1000),
                        });
                    }
                }

                setbatchdeliverdetails(formattedDeliveryDetails);

                return formattedDeliveryDetails;
            } catch (error) {
                console.error("Error fetching batch delivery details: ", error);
                return null;
            }
        },
        record_batch_report: async (batchId, stage, stagecondition) => {
            try {
                if (!RealTimeMonitoringContarct) {
                    console.error("RealTimeMonitoringContract not initialized");
                    return {
                        success: false,
                        message: "RealTimeMonitoringContract not initialized",
                    };
                }

                const response = await RealTimeMonitoringContarct.methods
                    .recordBatchReport(batchId, stage, stagecondition)
                    .send({
                        from: account,
                    });

                if (response.status) {
                    console.log(
                        `Batch report recorded successfully for Batch ID ${batchId}`
                    );
                    return {
                        success: true,
                        message: `Batch report recorded successfully`,
                    };
                } else {
                    console.error("Transaction failed");
                    return { success: false, message: "Transaction failed" };
                }
            } catch (error) {
                console.error("Error recording batch report: ", error);
                return { success: false, message: error.message };
            }
        },

        assign_role: async (address, key) => {
            try {
                if (!AdminContract) {
                    console.error("AdminContract not initialized");
                    return { success: false, message: "AdminContract not initialized" };
                }

                if (key == 1) {
                    await AdminContract.methods.addSupplier(address).send({
                        from: account,
                    });
                } else if (key == 2) {
                    await AdminContract.methods.addManufacturer(address).send({
                        from: account,
                    });
                } else if (key == 3) {
                    await AdminContract.methods.addInspector(address).send({
                        from: account,
                    });
                } else if (key == 4) {
                    await AdminContract.methods.addTransporter(address).send({
                        from: account,
                    });
                } else {
                    await AdminContract.methods.addWholesaler(address).send({
                        from: account,
                    });
                }
            } catch (error) {
                console.error("Error in assigning role: ", error);
                return { success: false, message: error.message };
            }
        },

        deAssign_role: async (address) => {
            try {
                if (!AdminContract) {
                    console.error("AdminContract not initialized");
                    return { success: false, message: "AdminContract not initialized" };
                }

                const isSupplier = await AdminContract.methods
                    .suppliers(address)
                    .call();
                const isManufacturer = await AdminContract.methods
                    .manufacturers(address)
                    .call();
                const isInspector = await AdminContract.methods
                    .inspectors(address)
                    .call();
                const isTransporter = await AdminContract.methods
                    .transporters(address)
                    .call();
                const isWholesaler = await AdminContract.methods
                    .wholesalers(address)
                    .call();

                if (isSupplier) {
                    await AdminContract.methods.removeSupplier(address).send({
                        from: account,
                    });
                } else if (isManufacturer) {
                    await AdminContract.methods.removeManufacturer(address).send({
                        from: account,
                    });
                } else if (isInspector) {
                    await AdminContract.methods.removeInspector(address).send({
                        from: account,
                    });
                } else if (isTransporter) {
                    await AdminContract.methods.removeTransporter(address).send({
                        from: account,
                    });
                } else if (isWholesaler) {
                    await AdminContract.methods.removeWholesaler(address).send({
                        from: account,
                    });
                } else {
                    return {
                        success: false,
                        message: "No role assigned to this address",
                    };
                }
            } catch (error) {
                console.error("Error in deAssigning role: ", error);
                return { success: false, message: error.message };
            }
        },

        request_raw_material_package: async (
            _rawMaterialsIds,
            _rawMaterialsQuantities,
            _description,
            _transporterId,
            _supplierId,
            _inspectorId
        ) => {
            try {
                if (!SupplierContract) {
                    console.error("SupplierContract not initialized");
                    return {
                        success: false,
                        message: "SupplierContract not initialized",
                    };
                }

                await SupplierContract.methods
                    .requestRawMaterialPackage(
                        _rawMaterialsIds,
                        _rawMaterialsQuantities,
                        _description,
                        account,
                        _transporterId,
                        _supplierId,
                        _inspectorId
                    )
                    .send({
                        from: account,
                    });

                return { success: true, message: "Raw material package requested successfully" };

            } catch (error) {
                console.error("Error in requesting raw material package: ", error);
                return { success: false, message: error.message };
            }
        },

        create_batch: async (
            _medicineIds,
            _medicineQuantities,
            estimatedCost,
            productionRatePerDay,
            _idealstage1conditions,
            _idealstage2conditions,
            _idealpackagingconditions,
            _inspectorId,
            _transporterId,
            _wholesalerId
        ) => {
            try {
                if (!ManufacturerContract) {
                    console.error("ManufacturerContract not initialized");
                    return {
                        success: false,
                        message: "ManufacturerContract not initialized",
                    };
                }

                await ManufacturerContract.methods
                    .requestRawMaterialPackage(
                        _medicineIds,
                        _medicineQuantities,
                        estimatedCost,
                        productionRatePerDay,
                        _idealstage1conditions,
                        _idealstage2conditions,
                        _idealpackagingconditions,
                        _inspectorId,
                        _transporterId,
                        _wholesalerId
                    )
                    .send({
                        from: account,
                    });

                return { success: true, message: "Batch Created successfully" };

            } catch (error) {
                console.error("Error in creating batch: ", error);
                return { success: false, message: error.message };
            }
        },
        get_role: async (_account) => {
            try {
                if (!AdminContract) {
                    console.error("AdminContract not initialized");
                    return { success: false, message: "AdminContract not initialized" };
                }
                console.log("Account: ", _account)

                const isSupplier = await AdminContract.methods.suppliers(_account).call();
                const isManufacturer = await AdminContract.methods.manufacturers(_account).call();
                const isInspector = await AdminContract.methods.inspectors(_account).call();
                const isTransporter = await AdminContract.methods.transporters(_account).call();
                const isWholesaler = await AdminContract.methods.wholesalers(_account).call();

                if (isSupplier) {
                    console.log("hiiiiiiiiii from supplier")
                    return { success: true, data: "Supplier" };
                } else if (isManufacturer) {
                    console.log("hiiiiiiiiii from manu")
                    return { success: true, data: "Manufacturer" };
                } else if (isInspector) {
                    console.log("hiiiiiiiiii from inspe")
                    return { success: true, data: "Inspector" };
                } else if (isTransporter) {
                     console.log("hiiiiiiiiii from transpo")
                    return { success: true, data: "Transporter" };
                } else if (isWholesaler) {
                    console.log("hiiiiiiiiii from wholeseller")
                    return { success: true, data: "Wholesaler" };
                } else {
                    console.log("hiiiiiiiiii from else")
                    return { success: false, message: "No role assigned to this address" };
                }
            } catch (error) {
                console.error("Error in getting role: ", error);
                return { success: false, message: error.message };
            }
        },

    };

    const [state, setState] = useState({
        AdminContract: null,
    });

    return (
        <ContractContext.Provider
            value={{
                ...state,
                ...{
                    updateContract,
                    Services,
                    rawMaterials,
                    packages,
                    medicines,
                    batches,
                    packagereports,
                    batchreports,
                    packagedeliverdetails,
                    batchdeliverdetails
                },
            }}
        >
            {props.children}
        </ContractContext.Provider>
    );
}

export default ContractContextProvider;