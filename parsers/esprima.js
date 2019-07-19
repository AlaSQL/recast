"use strict";

// This module is suitable for passing as options.parser when calling
// recast.parse to process ECMAScript code with Esprima:
//
//   const ast = recast.parse(source, {
//     parser: require("recast/parsers/esprima")
//   });
//
const getOption = require("../lib/util.js").getOption;

exports.parse = function (source, options) {
  return exports.__parseInternal(source, options);
};

// required by unit tests to pass additional options to esprima
exports.__parseInternal = function (source, options, extraOptions) {
  const comments = [];
  const ast = require("@gerhobbelt/esprima").parse(source, {
    loc: true,
    locations: true,
    comment: true,
    onComment: comments,
    range: getOption(options, "range", false),
    tolerant: getOption(options, "tolerant", true),
    tokens: true,                      // getOption(options, "tokens", true),
    ...extraOptions
  });

  if (! Array.isArray(ast.comments)) {
    ast.comments = comments;
  }

  return ast;
};
