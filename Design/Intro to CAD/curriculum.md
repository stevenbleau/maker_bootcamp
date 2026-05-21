# Intro to CAD Curriculum

## Notes

- Macro objectives describe the module-wide learning outcome.
- Micro objectives are the transferable skills inside that outcome.
- Touchpoints are tool-specific and can be swapped if the curriculum is ported to another CAD platform.




## Macro Objective: Parametric design

Concept blurb: Parametric design means defining intent through named variables and expressions so geometry updates predictably when key values change.

| Micro objective | Fusion touchpoint | FreeCAD touchpoint | Onshape touchpoint | Deck step | Notes |
|---|---|---|---|---|---|
| Define a named parameter | Modify > Change Parameters > + User Parameter | Spreadsheet Workbench: create a cell Alias (named parameter) | Variable feature in Part Studio | 01-cad-level-2 step 2.3 | Core setup step |
| Define a parameter with an expression | Enter an expression in the Expression field in Change Parameters | Expression editor (f(x)) in a property or constraint field | Set variable value with an expression in the Variable feature dialog | 01-cad-level-2 step 2.8, 2.9 | Builds reusable relationships |
| Apply the parameter to geometry | Use the parameter name in a sketch dimension or feature input | Reference Spreadsheet.Alias in a constraint or property expression | Use #variable in a dimension or feature value field | 01-cad-level-2 step 3.7, 3.8, 3.13, 4.6, 4.7, 4.8, 4.13, 5.7, 5.11, 6.8 | Connects logic to model behavior |

## Macro Objective: Fit tolerance

Concept blurb: Fit tolerance describes intentional dimensional difference between mating parts, such as clearance fit versus interference fit, to control assembly behavior.

| Micro objective | Fusion touchpoint | FreeCAD touchpoint | Onshape touchpoint | Deck step | Notes |
|---|---|---|---|---|---|
| Define a tolerance target for a mating feature | Edit sketch or feature dimensions by target offset | Edit sketch constraints or feature properties with expressions/aliases | Edit sketch or feature dimensions by target offset | 01-cad-level-2 step 2.6, 5.7 | Explicitly state target fit class in notes |
| Adjust geometry to achieve target fit | Change Parameters: update diameter/width user parameters | Update Spreadsheet alias values and recompute | Update Variable feature values and dependent dimensions | 01-cad-level-2 step 5.7, 5.11 | Iterative tuning step |
| Validate fit after adjustment | Re-measure and test assembly behavior | Re-measure in part/assembly context | Re-measure and test mate behavior | 01-cad-level-2 step 6.9 | Record final working tolerance window |

## Macro Objective: CAD setup and project hygiene

Concept blurb: Configure units and project files so downstream dimensions and features stay reliable.

| Micro objective | Fusion touchpoint | FreeCAD touchpoint | Onshape touchpoint | Deck step | Notes |
|---|---|---|---|---|---|
| Create a new project file | File > New Design | File > New | Create document and Part Studio | 01-cad-level-2 step 1.1 | Start in a clean workspace |
| Set document units to millimeters | Browser Document Settings > Units | Document unit settings | Workspace units | 01-cad-level-2 step 1.2, 1.3 | Prevent scale mismatch |
| Save and name the project clearly | File > Save and set name | File > Save As | Rename document or tab | 01-cad-level-2 step 1.4, 1.5 | Supports collaboration and versioning |

## Macro Objective: Sketch-driven base geometry

Concept blurb: Build robust 3D forms from fully defined 2D sketches and named dimensions.

| Micro objective | Fusion touchpoint | FreeCAD touchpoint | Onshape touchpoint | Deck step | Notes |
|---|---|---|---|---|---|
| Start a sketch on the intended plane | Create Sketch and select plane | Sketcher new sketch on plane | Sketch and select plane | 01-cad-level-2 step 3.1, 3.2 | Plane selection sets model orientation |
| Create a center-based rectangle profile | Rectangle > Center Rectangle | Sketcher rectangle tool | Center-point rectangle tool | 01-cad-level-2 step 3.3, 3.4, 3.5 | Centered layout helps symmetric edits |
| Dimension profile with named parameters | Sketch Dimension and parameter names | Constraint dimensions with expressions | Dimension fields with #variables | 01-cad-level-2 step 3.6, 3.7, 3.8 | Links geometry to parametric model |
| Finish sketch cleanly for feature creation | Finish Sketch | Leave sketch edit mode | Exit sketch | 01-cad-level-2 step 3.9 | Keeps workflow deterministic |

## Macro Objective: Constraints

Concept blurb: Constraints define relationships between sketch entities so geometry stays intentional, consistent, and fully or partially defined as needed.

THIS TOPIC IS NOT YET MAPPED TO A SPECIFIC PROJECT STEP IN THE CURRENT DECK.

| Micro objective | Fusion touchpoint | FreeCAD touchpoint | Onshape touchpoint | Deck step | Notes |
|---|---|---|---|---|---|
| Apply basic sketch constraints | Sketch constraints toolbar (coincident, horizontal, vertical, equal, tangent) | Sketcher constraints toolbar | Sketch constraints toolbar | UNMAPPED | Establishes sketch relationships |
| Recognize under-constrained vs fully constrained sketches | Read sketch colors and degrees of freedom | Check constraint solver / degrees of freedom | Read sketch status and constraint indicators | UNMAPPED | Helps diagnose sketch stability |
| Lock down geometry with constraints instead of dimensions | Use constraints to remove movement before adding dimensions | Add constraints to remove free degrees of freedom | Add constraints to stabilize sketch entities | UNMAPPED | Prevents accidental geometry drift |

## Macro Objective: Feature-based solid modeling

Concept blurb: Convert sketches to solid features and control operations with parameterized values.

| Micro objective | Fusion touchpoint | FreeCAD touchpoint | Onshape touchpoint | Deck step | Notes |
|---|---|---|---|---|---|
| Extrude sketch profiles into solids | Solid > Create > Extrude | Part Design Pad | Extrude feature | 01-cad-level-2 step 3.11, 3.12, 3.13 | Core 2D-to-3D step |
| Use parameterized feature depths | Extrude distance uses parameter name | Length or depth via expression | Depth field with #variable | 01-cad-level-2 step 3.13, 4.13 | Maintains editable design intent |
| Create additive stud features | Sketch plus Extrude add operation | New sketch plus Pad | Sketch plus Add extrude | 01-cad-level-2 step 4.1-4.13 | Reusable feature workflow |
| Create subtractive features with cut op | Extrude operation equals Cut | Pocket or remove operation | Remove extrude operation | 01-cad-level-2 step 5.9, 5.10, 5.11 | Needed for mating geometry |

## Macro Objective: Reference and offset workflows

Concept blurb: Reuse existing geometry and apply offsets to create precise mating relationships.

| Micro objective | Fusion touchpoint | FreeCAD touchpoint | Onshape touchpoint | Deck step | Notes |
|---|---|---|---|---|---|
| Reuse prior sketch geometry as reference | Project tool | External geometry in Sketcher | Use or convert entities | 01-cad-level-2 step 5.3, 5.4, 5.5 | Avoids re-dimensioning drift |
| Create clearance using offset geometry | Offset tool with fit parameter | Offset geometry tool | Offset sketch entities | 01-cad-level-2 step 5.6, 5.7 | Encodes fit intent directly |
| Apply tolerance in subtractive depth | Cut depth expression with tolerance term | Pocket depth expression | Remove depth with variable expression | 01-cad-level-2 step 5.11 | Controls assembly feel |

## Macro Objective: Patterning and scalable feature replication

Concept blurb: Use parametric patterns to scale repeated features from a single source feature.

| Micro objective | Fusion touchpoint | FreeCAD touchpoint | Onshape touchpoint | Deck step | Notes |
|---|---|---|---|---|---|
| Create rectangular feature pattern | Rectangular Pattern | Linear or multi-transform pattern | Linear pattern | 01-cad-level-2 step 6.1 | Replication instead of manual duplication |
| Select correct pattern object type | Object type equals Features | Pattern feature selection mode | Feature pattern mode | 01-cad-level-2 step 6.2, 6.3, 6.4 | Ensures both top and bottom features propagate |
| Define pattern axes and distribution | Axes select plus Spacing distribution | Direction references plus spacing mode | Direction 1 and 2 with spacing | 01-cad-level-2 step 6.5, 6.6, 6.7 | Controls orientation and spacing logic |
| Drive quantity and spacing by parameters | Quantity equals length and width, spacing equals stud_spacing | Instance count and spacing expressions | Count and distance via #variables | 01-cad-level-2 step 6.8 | Final step for scalable families |

