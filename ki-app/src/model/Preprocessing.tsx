/**
 * Dieses Enum listet sämtliche verfügbaren Varianten auf, um Daten für ein KI-Modell vorzuverarbeiten.
 */
export enum Preprocessing {
    MIN_MAX,
    NORMALIZER,
    QUANTILE_TRANSFORMER,
    ROBUST_SCALER,
    STANDARD_SCALER
}